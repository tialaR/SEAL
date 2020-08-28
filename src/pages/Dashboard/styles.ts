import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Homeless } from './index';

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const HomelessList = styled(
  FlatList as new () => FlatList<Homeless>,
).attrs({
  contentContainerStyle: { paddingBottom: 90 },
})`
  padding: 20px 0 32px;
`;
