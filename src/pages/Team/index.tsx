import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Form } from '@unform/mobile';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { TextInput } from 'react-native';
import { colors } from '../../styles/colors';
import TrashSwipeButton from '../../components/TrashSwipeButton';
import RegisterModal from '../../components/RegisterModal';
import SectionTitle from '../../components/SectionTitle';
import getValidationErrors from '../../utils/getValidationErros';
import { teamMock } from '../../mocks/team';
import FloatButton from '../../components/FloatButton';
import GroupMemberCard from '../../components/GroupMemberCard';

import Input from '../../components/Input';
import Button from '../../components/Button';
import InformationModal from '../../components/InformationModal';

import { Container, TeamList } from './styles';

export interface GroupMember {
  id: string;
  name: string;
  center: string;
}

interface RegisterGroupMemberFormData {
  name: string;
  center: string;
}

interface InformationFeedback {
  icon: string;
  color: string;
  message: string;
}

const Team: React.FC = () => {
  const centerInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  const [team, setTeam] = useState<GroupMember[]>([]);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const [showInformationModal, setShowInformationModal] = useState(false);
  const [informationFeedback, setInformationFeedback] = useState<
    InformationFeedback
  >({} as InformationFeedback);

  useEffect(() => {
    setTeam(teamMock);
  }, []);

  const feedbackTryUpdated = useCallback(
    ({ icon, color, message }: InformationFeedback) => {
      setShowInformationModal(true);
      setInformationFeedback({
        icon,
        color,
        message,
      });
    },
    [setShowInformationModal, setInformationFeedback],
  );

  const handleInformationModalClose = useCallback(() => {
    setShowInformationModal(false);
  }, [setShowInformationModal]);

  const handleRegisterModalHide = useCallback(() => {
    setRegisterModalVisible(false);
  }, []);

  const handleAddNewMemberGroup = useCallback(() => {
    setRegisterModalVisible(true);
  }, []);

  const handleRegister = useCallback(
    async (data: RegisterGroupMemberFormData) => {
      try {
        formRef.current?.setErrors({});

        // Esquema do objeto recebido por parâmetro
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          center: Yup.string().required('Centro obrigatório'),
        });

        // Validando campos do input
        await schema.validate(data, {
          abortEarly: false,
        });

        // Registrar membro e fechar modal
        setRegisterModalVisible(false);
        console.warn('Membro registrado');
      } catch (err) {
        // Erros de validação
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);

          return;
        }

        // Disparar um alerta nos erros de cadatro do membro
        feedbackTryUpdated({
          color: colors.highRisk,
          icon: 'alert-triangle',
          message:
            'Ocorreu um erro ao fazer o cadastro do membro, tente novamente.',
        });
      }
    },
    [setRegisterModalVisible],
  );

  const renderCardSwipeRight = useCallback((dependentId: string) => {
    return (
      <TrashSwipeButton
        onTrashSwipeButtonPress={() =>
          console.warn(`Membro ${dependentId} excluído da equipe`)
        }
      />
    );
  }, []);

  return (
    <Container>
      <TeamList
        data={team}
        keyExtractor={memberGroup => memberGroup.id}
        ListHeaderComponent={(
          <SectionTitle
            title="Equipe"
            sectionTitleStyles={{ marginLeft: 24 }}
          />
        )}
        renderItem={({ item: memberGroup }) => (
          <Swipeable
            renderRightActions={() => renderCardSwipeRight(memberGroup.id)}
          >
            <GroupMemberCard
              name={memberGroup.name}
              center={memberGroup.center}
              onCardPress={() => false}
            />
          </Swipeable>
        )}
      />

      <FloatButton onFloatButtonPress={handleAddNewMemberGroup} />

      <RegisterModal
        title="Cadastrar novo membro"
        isVisible={registerModalVisible}
        hideModal={handleRegisterModalHide}
      >
        <Form ref={formRef} onSubmit={handleRegister}>
          <Input
            autoCapitalize="words"
            name="name"
            icon="user"
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => centerInputRef.current.focus()}
          />
          <Input
            ref={centerInputRef}
            name="center"
            icon="home"
            placeholder="Centro"
            returnKeyType="next"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

          <Button onPress={() => formRef.current?.submitForm()}>
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
    </Container>
  );
};

export default Team;
