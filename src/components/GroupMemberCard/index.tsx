import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  GroupMemberContainer,
  GroupMemberName,
  GroupMemberMeta,
  GroupMemberMetaText,
} from './styles';
import { colors } from '../../styles/colors';

interface GroupMemberCardProps {
  name: string;
  center: string;
  onCardPress: () => void;
}

const GroupMemberCard: React.FC<GroupMemberCardProps> = ({
  name,
  center,
  onCardPress,
}: GroupMemberCardProps) => {
  return (
    <GroupMemberContainer onPress={onCardPress}>
      <GroupMemberName>{name}</GroupMemberName>
      <GroupMemberMeta>
        <Icon name="home" size={15} color={colors.primary} />
        <GroupMemberMetaText>{center}</GroupMemberMetaText>
      </GroupMemberMeta>
    </GroupMemberContainer>
  );
};

export default GroupMemberCard;
