import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

interface HomelessMetaProps {
  second?: boolean;
}

export const HomelessContainer = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 8px;
`;

export const HomelessMeta = styled.View<HomelessMetaProps>`
  flex-direction: row;
  align-items: center;

  margin-top: ${props => (props.second ? 8 : 0)}px;
`;

export const HomelessMetaText = styled.Text`
  margin-left: 8px;
  color: ${colors.secondary};
  font-family: 'RobotoSlab-Regular';
  font-size: 13px;
`;
