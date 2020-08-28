import React from 'react';
import IconButton from '../IconButton';

import { TrashSwipeButtonContainer } from './styles';
import { colors } from '../../styles/colors';

interface TrashSwipeButtonProps {
  onTrashSwipeButtonPress: () => void;
  smallCard?: boolean;
}

const TrashSwipeButton: React.FC<TrashSwipeButtonProps> = ({
  onTrashSwipeButtonPress,
  smallCard = false,
}: TrashSwipeButtonProps) => {
  return (
    <>
      <TrashSwipeButtonContainer smallCard={smallCard}>
        <IconButton
          icon="trash"
          color={colors.highRisk}
          size={26}
          onIconButtonPress={onTrashSwipeButtonPress}
        />
      </TrashSwipeButtonContainer>
    </>
  );
};

export default TrashSwipeButton;
