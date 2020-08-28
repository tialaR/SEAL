import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { FloatButtonContainer } from './styles';
import { colors } from '../../styles/colors';

interface FloatButtonProps {
  onFloatButtonPress: () => void;
}

const FloatButton: React.FC<FloatButtonProps> = ({
  onFloatButtonPress,
}: FloatButtonProps) => {
  return (
    <FloatButtonContainer onPress={onFloatButtonPress}>
      <Icon name="plus" size={18} color={colors.white} />
    </FloatButtonContainer>
  );
};

export default FloatButton;
