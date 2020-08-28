import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

export const ContainerIconButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 8px;
`;
