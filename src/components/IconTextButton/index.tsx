import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

import { ContainerIconButton, Title } from './styles';

interface IconTextButtonProps {
  title: string;
  icon: string;
  onIconButtonPress: () => void;
}

const IconTextButton: React.FC<IconTextButtonProps> = ({
  title,
  icon,
  onIconButtonPress,
}: IconTextButtonProps) => {
  return (
    <ContainerIconButton onPress={onIconButtonPress}>
      <Icon name={icon} size={15} color={colors.primary} />
      <Title>{title}</Title>
    </ContainerIconButton>
  );
};

export default IconTextButton;
