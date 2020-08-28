import styled from 'styled-components/native';

interface TrashSwipeButtonProps {
  smallCard: boolean;
}

export const TrashSwipeButtonContainer = styled.View<TrashSwipeButtonProps>`
  align-items: center;
  justify-content: center;
  padding-left: ${props => (props.smallCard ? 0 : 12)}px;
  padding-right: ${props => (props.smallCard ? 12 : 42)}px;
`;
