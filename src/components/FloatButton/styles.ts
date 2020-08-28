import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

export const FloatButtonContainer = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  border-radius: 23px;
  background-color: ${colors.primary};
  box-shadow: 0px 10px 14px ${colors.shadow};
  elevation: 2;

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 20px;
  right: 24px;
`;
