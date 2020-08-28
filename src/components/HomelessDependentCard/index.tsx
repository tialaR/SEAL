import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { HomelessContainer, HomelessMeta, HomelessMetaText } from './styles';
import { colors } from '../../styles/colors';

interface HomelessDependentCardProps {
  name: string;
  age: string;
  onCardPress: () => void;
}

const HomelessDependentCard: React.FC<HomelessDependentCardProps> = ({
  name,
  age,
  onCardPress,
}: HomelessDependentCardProps) => {
  return (
    <HomelessContainer onPress={onCardPress}>
      <HomelessMeta>
        <Icon name="user" size={15} color={colors.primary} />
        <HomelessMetaText>{name}</HomelessMetaText>
      </HomelessMeta>
      <HomelessMeta second>
        <Icon name="calendar" size={15} color={colors.primary} />
        <HomelessMetaText>{age}</HomelessMetaText>
      </HomelessMeta>
    </HomelessContainer>
  );
};

export default HomelessDependentCard;
