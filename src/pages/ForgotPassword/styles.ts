import {Platform} from 'react-native';
import styled from 'styled-components/native';

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
