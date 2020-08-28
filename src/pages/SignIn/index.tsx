import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import * as Yup from 'yup';
import { colors } from '../../styles/colors';
import InformationModal from '../../components/InformationModal';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErros';
import { Container, Logo, ForgotPassword, ForgotPasswordText } from './styles';
import SectionTitle from '../../components/SectionTitle';

interface SignInFormData {
  email: string;
  password: string;
}

interface InformationFeedback {
  icon: string;
  color: string;
  message: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  const [showInformationModal, setShowInformationModal] = useState(false);
  const [informationFeedback, setInformationFeedback] = useState<
    InformationFeedback
  >({} as InformationFeedback);

  const { signIn } = useAuth();

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

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        // Esquema do objeto recebido por parâmetro
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        // Validando campos do input
        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
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
          message: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn],
  );

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

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
            title="Faça seu logon"
          />

          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="Senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <ForgotPassword onPress={handleForgotPassword}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>

            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Form>

          <InformationModal
            isVisible={showInformationModal}
            information={informationFeedback.message}
            icon={informationFeedback.icon}
            iconColor={informationFeedback.color}
            showModal={handleInformationModalClose}
          />
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
