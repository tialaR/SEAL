import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  HomelessContainer,
  HomelessAvatar,
  HomelessInfo,
  HomelessName,
  HomelessMeta,
  HomelessMetaText,
  HomlessRiskIndicator,
} from './styles';
import { colors } from '../../styles/colors';

interface HomelessCardProps {
  name: string;
  avatarUrl: string;
  age: string;
  location: string;
  riskSituation: 'low' | 'medium' | 'high';
  onCardPress: () => void;
}

const HomelessCard: React.FC<HomelessCardProps> = ({
  name,
  avatarUrl,
  age,
  location,
  riskSituation,
  onCardPress,
}: HomelessCardProps) => {
  return (
    <HomelessContainer onPress={onCardPress}>
      <HomelessAvatar source={{ uri: avatarUrl }} />

      <HomelessInfo>
        <HomelessName>{name}</HomelessName>
        <HomelessMeta>
          <Icon name="calendar" size={15} color={colors.primary} />
          <HomelessMetaText>{age}</HomelessMetaText>
        </HomelessMeta>

        <HomelessMeta>
          <Icon name="map" size={15} color={colors.primary} />
          <HomelessMetaText>{location}</HomelessMetaText>
        </HomelessMeta>
      </HomelessInfo>

      <HomlessRiskIndicator riskSituation={riskSituation} />
    </HomelessContainer>
  );
};

export default HomelessCard;
