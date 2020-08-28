import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '../../styles/colors';

const { width } = Dimensions.get('window');
const modalWidth = width - 60;

export const Overlay = styled.View`
  position: absolute;
  background-color: ${colors.black};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.4;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const FormContainer = styled.View`
  padding: 40px 24px;
  width: ${modalWidth}px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.background};
  border-radius: 10px;
  box-shadow: 0px 10px 14px ${colors.shadow};
  elevation: 4;

  position: relative;
`;

export const ContainerIconButton = styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
`;
