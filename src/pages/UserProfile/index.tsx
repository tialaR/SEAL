import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef, useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import * as Yup from 'yup';
import { colors } from '../../styles/colors';
import InformationModal from '../../components/InformationModal';
import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/auth';
import { Container, ContainerButtons } from './styles';
import AvatarProfile from '../../components/AvatarProfile';
import IconButton from '../../components/IconButton';

interface UserProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

interface InformationFeedback {
  icon: string;
  color: string;
  message: string;
  status: 'success' | 'error';
}

const UserProfile: React.FC = () => {
  const { signOut, user, updateUser } = useAuth();

  const navigation = useNavigation();

  const [showInformationModal, setShowInformationModal] = useState(false);
  const [informationFeedback, setInformationFeedback] = useState<
    InformationFeedback
  >({} as InformationFeedback);

  const [userAvatar, setUserAvatar] = useState<string>(user.avatarUrl);

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

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
    async (data: UserProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        // Esquema do objeto recebido por parâmetro
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        // Validando campos do input
        await schema.validate(data, {
          abortEarly: false,
        });

        // Dados para enviar para api
        const formData = {
          name: data.name,
          email: data.email,
          ...(data.old_password
            ? {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
              }
            : {}),
        };

        // Atualizando usuário no contexto (com o response da api)
        updateUser({
          id: '1',
          name: data.name,
          email: data.email,
          avatarUrl: userAvatar,
        });

        // Atualizar Perfil
        feedbackTryUpdated({
          status: 'success',
          color: colors.green,
          icon: 'check',
          message: 'Perfil do usuário atualizado atualizado com sucesso.',
        });
      } catch (err) {
        // Erros de validação
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);

          return;
        }

        // Erros de atualização do perfil
        feedbackTryUpdated({
          status: 'error',
          color: colors.highRisk,
          icon: 'alert-triangle',
          message:
            'Ocorreu um erro ao atualizar o perfil do usuário, tente novamente.',
        });
      }
    },
    [navigation, userAvatar, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma foto para o perfil',
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
            message:
              'Ocorreu um erro ao atualizar a foto do seu perfil, tente novamente.',
          });
          return;
        }

        const data = new FormData();

        // Configurando objeto do tipo FormData para enviar a api
        data.append('avatar', {
          type: 'image/jpeg', // tipo da imagem
          name: `${user.id}.jpeg`, // nome da imagem
          uri: response.uri, // url da imagem
        });

        // Atualizar a foto do usuáio na api
        setUserAvatar(response.uri);
      },
    );
  }, [setUserAvatar, user.id]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
            <IconButton icon="power" size={24} onIconButtonPress={signOut} />
          </ContainerButtons>

          <AvatarProfile
            avatar={userAvatar}
            onChangeAvatar={handleUpdateAvatar}
          />

          <SectionTitle
            sectionTitleStyles={{ marginTop: 30 }}
            title="Perfil do usuário"
          />

          <Form
            initialData={{
              name: user.name,
              email: user.email,
            }}
            ref={formRef}
            onSubmit={handleUpdateProfile}
          >
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current.focus()}
            />
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => oldPasswordInputRef.current.focus()}
            />
            <Input
              ref={oldPasswordInputRef}
              containerStyle={{ marginTop: 16 }}
              secureTextEntry
              autoCompleteType="off"
              textContentType="newPassword"
              name="password"
              icon="lock"
              placeholder="Senha atual"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              autoCompleteType="off"
              textContentType="newPassword"
              name="old_password"
              icon="lock"
              placeholder="Nova senha"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />
            <Input
              ref={confirmPasswordInputRef}
              secureTextEntry
              autoCompleteType="off"
              textContentType="newPassword"
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Confirmar
            </Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>

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

export default UserProfile;
