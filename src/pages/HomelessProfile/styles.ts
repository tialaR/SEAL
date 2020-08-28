import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

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
  margin-top: 50px;
`;

export const HomelessDependentsContainer = styled.View`
  margin-top: 34px;
`;

export const HomelessDependentsStatus = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.secondary};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 8px;
`;

export const HomelessDependentsStatusText = styled.Text`
  font-size: 13px;
  color: ${colors.tertiary};
  font-family: 'RobotoSlab-Regular';
`;

export const HomelessDependentsStatusAddButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${colors.primary};
  box-shadow: 0px 10px 14px ${colors.shadow};
  elevation: 2;

  align-items: center;
  justify-content: center;
`;
