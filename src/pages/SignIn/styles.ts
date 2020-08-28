import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

export const Container = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    paddingBottom: Platform.OS === 'android' ? 150 : 100,
  },
})`
  flex: 1;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 50px;
`;

export const Logo = styled.Image`
  align-self: center;
  width: 170px;
  height: 170px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin: 4px 0 10px;
`;

export const ForgotPasswordText = styled.Text`
  color: ${colors.primary};
  font-size: 13px;
  font-family: 'RobotoSlab-Regular';
`;
