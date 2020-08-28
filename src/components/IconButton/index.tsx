import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { IconButtonContainer } from './styles';
import { colors } from '../../styles/colors';

interface IconButtonProps {
  icon: string;
  onIconButtonPress: () => void;
  size?: number;
  color?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 30,
  color = colors.primary,
  onIconButtonPress,
}: IconButtonProps) => {
  return (
    <IconButtonContainer onPress={onIconButtonPress}>
      <Icon name={icon} size={size} color={color} />
    </IconButtonContainer>
  );
};

export default IconButton;
