import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { colors } from '../../styles/colors';

export const BottomButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 5px 10px ${colors.shadow};
  elevation: 4;

  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${colors.background};
  border-top-width: 0.3px;
  border-color: ${colors.secondary};

  padding: 16px 0 ${16 + getBottomSpace()}px;
`;

export const BottomButtonContainerText = styled.Text`
  color: ${colors.primary};
  font-size: 14px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 10px;
`;
