import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { GroupMember } from './index';

export const Container = styled.View`
  flex: 1;
  position: relative;
  padding-top: ${getStatusBarHeight()}px;
`;

export const TeamList = styled(
  FlatList as new () => FlatList<GroupMember>,
).attrs({
  contentContainerStyle: { paddingBottom: 90 },
})`
  padding: 20px 0 32px;
`;
