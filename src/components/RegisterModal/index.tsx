import React, { ReactChild } from 'react';
import { Modal } from 'react-native';
import SectionTitle from '../SectionTitle';

import {
  Overlay,
  Container,
  FormContainer,
  ContainerIconButton,
} from './styles';
import IconButton from '../IconButton';

interface RegisterModalProps {
  isVisible: boolean;
  title: string;
  children: ReactChild;
  hideModal: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isVisible,
  title,
  children,
  hideModal,
}: RegisterModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={() => false}
    >
      <Overlay />
      <Container>
        <FormContainer>
          <ContainerIconButton>
            <IconButton icon="x" size={24} onIconButtonPress={hideModal} />
          </ContainerIconButton>
          <SectionTitle title={title} />
          {children}
        </FormContainer>
      </Container>
    </Modal>
  );
};

export default RegisterModal;
