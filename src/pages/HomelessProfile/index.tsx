import { useNavigation, useRoute } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import * as Yup from 'yup';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import InformationModal from '../../components/InformationModal';
import TrashSwipeButton from '../../components/TrashSwipeButton';
import RegisterModal from '../../components/RegisterModal';
import SectionTitle from '../../components/SectionTitle';
import IconTextButton from '../../components/IconTextButton';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErros';
import HomelessDependentCard from '../../components/HomelessDependentCard';
import {
  Container,
  ContainerButtons,
  HomelessDependentsContainer,
  HomelessDependentsStatus,
  HomelessDependentsStatusText,
  HomelessDependentsStatusAddButton,
} from './styles';
import { colors } from '../../styles/colors';
import AvatarProfile from '../../components/AvatarProfile';
import IconButton from '../../components/IconButton';
import SelecRisktList from '../../components/SelectRiskList';

interface HomelessProfileFormData {
  name: string;
  dateOfBirth: string;
  location: string;
  contactPhoneNumber: string;
}

interface HomelessDependent {
  id: string;
  name: string;
  dateOfBirth: string;
}

export interface RouteParams {
  id: string;
  name: string;
  avatarUrl: string;
  dateOfBirth: string;
  location: string;
  contactPhoneNumber?: string;
  riskSituation: 'low' | 'medium' | 'high';
  dependents?: HomelessDependent[];
}

interface RegisterHomelessDependentFormData {
  dependentName: string;
  dependentAge: string;
}

interface InformationFeedback {
  icon: string;
  color: string;
  message: string;
  status: 'success' | 'error';
}

const HomelessProfile: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const [riskSituation, setRiskSituation] = useState(routeParams.riskSituation);
  const [homeless, setHomeless] = useState<RouteParams>(routeParams);
  const [homelessAvatar, setHomelessAvatar] = useState<string>(
    routeParams.avatarUrl,
  );
  const [homelessDependentsList, setHomelessDependentsList] = useState<
    HomelessDependent[] | undefined
  >([]);

  const formRef = useRef<FormHandles>(null);
  const dateOfBirthInputRef = useRef<TextInput>(null);
  const locationInputRef = useRef<TextInput>(null);
  const contactPhoneNumberInputRef = useRef<TextInput>(null);

  const formRefDependents = useRef<FormHandles>(null);
  const dependentAgeInputRef = useRef<TextInput>(null);

  const [showInformationModal, setShowInformationModal] = useState(false);
  const [informationFeedback, setInformationFeedback] = useState<
    InformationFeedback
  >({} as InformationFeedback);

  useEffect(() => {
    if (homeless.dependents) {
      setHomelessDependentsList(homeless.dependents);
    }
  }, [homeless.dependents]);

  const accountDependents = useCallback(() => {
    if (homelessDependentsList != null) {
      return homelessDependentsList.length;
    }
    return 0;
  }, [homelessDependentsList]);

  const feedbackTryUpdated = useCallback(
    ({ icon, color, message, status }: InformationFeedback) => {
      setShowInformationModal(true);
      setInformationFeedback({
        icon,
        color,
        message,
        status,
      });
    },
    [setShowInformationModal, setInformationFeedback],
  );

  const handleInformationModalClose = useCallback(() => {
    setShowInformationModal(false);

    if (informationFeedback.status === 'success') {
      navigation.goBack();
    }
  }, [setShowInformationModal, navigation, informationFeedback]);

  const handleUpdateProfile = useCallback(
    async (data: HomelessProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        // Esquema do objeto recebido por parâmetro
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          dateOfBirth: Yup.string().required('Data de nascimento obrigatória'),
          location: Yup.string().required('Contato obrigatório'),
        });

        // Validando campos do input
        await schema.validate(data, {
          abortEarly: false,
        });

        const homelessAux = {
          ...homeless,
          avatarUrl: homelessAvatar,
          name: data.name,
          dateOfBirth: data.dateOfBirth,
          location: data.location,
          contactPhoneNumber: data.contactPhoneNumber,
          riskSituation: riskSituation || 'low',
        };
        console.warn(homelessAux);
        setHomeless(homelessAux);

        // Atualizar Perfil
        feedbackTryUpdated({
          status: 'success',
          color: colors.green,
          icon: 'check',
          message: 'Perfil do morador atualizado atualizado com sucesso.',
        });
      } catch (err) {
        // Erros de validação
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);

          return;
        }

        // Disparar um alerta nos erros de atualização do perfil
        feedbackTryUpdated({
          status: 'error',
          color: colors.highRisk,
          icon: 'alert-triangle',
          message:
            'Ocorreu um erro ao atualizar o perfil do morador, tente novamente.',
        });
      }
    },
    [navigation, homelessAvatar, setHomeless, riskSituation],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma foto para o perfil do morador',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      response => {
        // Cancelou a escolha da imagem
        if (response.didCancel) {
          return;
        }

        // Deu algum erro
        if (response.error) {
          console.warn(response.error);
          feedbackTryUpdated({
            status: 'error',
            color: colors.highRisk,
            icon: 'alert-triangle',
            message: 'Erro ao atualizar o a foto de perfil do morador.',
          });
          return;
        }

        const data = new FormData();

        // Configurando objeto do tipo FormData para enviar a api
        data.append('avatar', {
          type: 'image/jpeg', // tipo da imagem
          name: `${homeless.id}.jpeg`, // nome da imagem
          uri: response.uri, // url da imagem
        });

        // Atualizando a foto do morador na api
        setHomelessAvatar(response.uri);
      },
    );
  }, [setHomelessAvatar, homeless.id]);

  const handleRegisterDependentModalHide = useCallback(() => {
    setRegisterModalVisible(false);
  }, []);

  const handleRegisterDependentModalShow = useCallback(() => {
    setRegisterModalVisible(true);
  }, []);

  const handleRegisterDependent = useCallback(
    async (data: RegisterHomelessDependentFormData) => {
      try {
        formRefDependents.current?.setErrors({});

        // Esquema do objeto recebido por parâmetro
        const schema = Yup.object().shape({
          dependentName: Yup.string().required('Nome obrigatório'),
          dependentAge: Yup.string().required('Idade obrigatória'),
        });

        // Validando campos do input
        await schema.validate(data, {
          abortEarly: false,
        });

        // Registrar membro e fechar modal
        setRegisterModalVisible(false);
        console.warn('Dependente registrado');
      } catch (err) {
        // Erros de validação
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRefDependents.current?.setErrors(erros);

          return;
        }

        // Disparar um alerta nos erros de cadatro do membro
        feedbackTryUpdated({
          status: 'error',
          color: colors.highRisk,
          icon: 'alert-triangle',
          message:
            'Ocorreu um erro ao fazer o cadastro do dependente, tente novamente.',
        });
      }
    },
    [setRegisterModalVisible],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleGoToMap = useCallback(() => {
    navigation.navigate('Map');
  }, [navigation]);

  const renderCardSwipeRight = useCallback((dependentId: string) => {
    return (
      <TrashSwipeButton
        smallCard
        onTrashSwipeButtonPress={() =>
          console.warn(
            `Dependente ${dependentId} do morador excluído da lista de dependentes`,
          )
        }
      />
    );
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <ContainerButtons>
            <IconButton icon="chevron-left" onIconButtonPress={handleGoBack} />
          </ContainerButtons>

          <AvatarProfile
            avatar={homelessAvatar}
            onChangeAvatar={handleUpdateAvatar}
          />

          <SectionTitle
            sectionTitleStyles={{ marginTop: 30 }}
            title="Perfil do morador"
          />

          <Form
            initialData={{
              name: homeless.name,
              dateOfBirth: homeless.dateOfBirth,
              location: homeless.location,
              contactPhoneNumber: homeless.contactPhoneNumber,
            }}
            ref={formRef}
            onSubmit={handleUpdateProfile}
          >
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              autoCorrect={false}
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => dateOfBirthInputRef.current.focus()}
            />
            <Input
              ref={dateOfBirthInputRef}
              autoCorrect={false}
              name="dateOfBirth"
              icon="calendar"
              placeholder="Data de nascimento"
              returnKeyType="next"
              onSubmitEditing={() => locationInputRef.current.focus()}
            />
            <Input
              ref={locationInputRef}
              name="location"
              autoCorrect={false}
              icon="map"
              placeholder="Contato"
              returnKeyType="next"
              onSubmitEditing={() =>
                contactPhoneNumberInputRef.current?.focus()
              }
            />
            <Input
              ref={contactPhoneNumberInputRef}
              // textContentType="telephoneNumber"
              name="contactPhoneNumber"
              icon="phone"
              placeholder="Telefone de contato"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <SelecRisktList
              onRiskPress={(risk: string) => setRiskSituation(risk)}
              riskSituation={riskSituation}
            />

            <IconTextButton
              title="Obter localização"
              icon="map-pin"
              onIconButtonPress={handleGoToMap}
            />

            <HomelessDependentsContainer>
              <HomelessDependentsStatus>
                <HomelessDependentsStatusText>
                  Dependentes: {accountDependents()}
                </HomelessDependentsStatusText>
                <HomelessDependentsStatusAddButton
                  onPress={handleRegisterDependentModalShow}
                >
                  <Icon name="plus" size={14} color={colors.white} />
                </HomelessDependentsStatusAddButton>
              </HomelessDependentsStatus>
              {homelessDependentsList != null &&
                homelessDependentsList.length > 0 && (
                  <>
                    {homelessDependentsList.map(homelessDependent => (
                      <Swipeable
                        key={homelessDependent.id}
                        renderRightActions={() =>
                          renderCardSwipeRight(homelessDependent.id)
                        }
                      >
                        <HomelessDependentCard
                          key={homelessDependent.id}
                          name={homelessDependent.name}
                          age={homelessDependent.dateOfBirth}
                          onCardPress={() => false}
                        />
                      </Swipeable>
                    ))}
                  </>
                )}
            </HomelessDependentsContainer>

            <Button onPress={() => formRef.current?.submitForm()}>
              Confirmar
            </Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>

      <RegisterModal
        title="Cadastrar novo dependente"
        isVisible={registerModalVisible}
        hideModal={handleRegisterDependentModalHide}
      >
        <Form ref={formRefDependents} onSubmit={handleRegisterDependent}>
          <Input
            name="dependentName"
            autoCapitalize="words"
            icon="user"
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => dependentAgeInputRef.current.focus()}
          />
          <Input
            ref={dependentAgeInputRef}
            name="dependentAge"
            icon="calendar"
            placeholder="Idade"
            returnKeyType="next"
            onSubmitEditing={() => formRefDependents.current?.submitForm()}
          />

          <Button onPress={() => formRefDependents.current?.submitForm()}>
            Cadastrar
          </Button>
        </Form>
      </RegisterModal>

      <InformationModal
        isVisible={showInformationModal}
        information={informationFeedback.message}
        icon={informationFeedback.icon}
        iconColor={informationFeedback.color}
        showModal={handleInformationModalClose}
      />
    </>
  );
};

export default HomelessProfile;
