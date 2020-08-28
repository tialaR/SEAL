import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import * as Yup from 'yup';
import InformationModal from '../../components/InformationModal';
import { colors } from '../../styles/colors';
import SectionTitle from '../../components/SectionTitle';
import BottomButton from '../../components/BottomButton';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErros';
import { Container, Logo } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

interface InformationFeedback {
  icon: string;
  color: string;
  message: string;
}

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);

  const [showInformationModal, setShowInformationModal] = useState(false);
  const [informationFeedback, setInformationFeedback] = useState<
    InformationFeedback
  >({} as InformationFeedback);

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
    navigation.goBack();
  }, [setShowInformationModal, navigation]);

  const handleForgotPassword = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        // Esquema do objeto recebido por parâmetro
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        // Validando campos do input
        await schema.validate(data, {
          abortEarly: false,
        });

        feedbackTryUpdated({
          color: colors.green,
          icon: 'check',
          message:
            'Enviamos um e-mail para confirmar a recuperação de sua senha. Cheque sua caixa de entrada.',
        });
      } catch (err) {
        // Erros de validação
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);

          return;
        }

        // Disparar um alerta nos erros de autenticação
        feedbackTryUpdated({
          color: colors.highRisk,
          icon: 'alert-triangle',
          message:
            'Ocorreu um erro ao tentar realizar a recuperação de sua senha, tente novamente.',
        });
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <Logo source={logoImg} />

          <SectionTitle
            sectionTitleStyles={{ marginTop: 40, alignSelf: 'center' }}
            title="Recuperação de senha"
          />

          <Form ref={formRef} onSubmit={handleForgotPassword}>
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => formRef.current.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Recuperar
            </Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>

      <BottomButton
        title="Voltar para logon"
        icon="arrow-left"
        onBottomButtonPress={() => navigation.goBack()}
      />

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

export default ForgotPassword;
