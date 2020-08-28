import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

export const GroupMemberContainer = styled.TouchableOpacity`
  background-color: ${colors.background};
  border-radius: 10px;
  padding: 20px;
  margin: 0 24px 16px 24px;

  box-shadow: 0px 10px 14px ${colors.shadow};
`;

export const GroupMemberName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 15px;
  color: ${colors.tertiary};
`;

export const GroupMemberMeta = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 8px;
`;

export const GroupMemberMetaText = styled.Text`
  margin-left: 8px;
  color: ${colors.secondary};
  font-family: 'RobotoSlab-Regular';
  font-size: 13px;
`;
