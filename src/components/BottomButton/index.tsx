import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

import { BottomButtonContainer, BottomButtonContainerText } from './styles';

interface BottomButtonProps {
  title: string;
  icon: string;
  onBottomButtonPress: () => void;
}

const BottomButton: React.FC<BottomButtonProps> = ({
  title,
  icon,
  onBottomButtonPress,
}: BottomButtonProps) => {
  return (
    <BottomButtonContainer onPress={onBottomButtonPress}>
      <Icon name={icon} size={16} color={colors.primary} />
      <BottomButtonContainerText>{title}</BottomButtonContainerText>
    </BottomButtonContainer>
  );
};

export default BottomButton;
