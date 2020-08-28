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
  background-color: ${colors.background};
  padding-left: 30px;
  padding-right: 30px;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;
