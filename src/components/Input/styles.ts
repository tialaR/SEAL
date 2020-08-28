import FeatherIcon from 'react-native-vector-icons/Feather';
import styled, { css } from 'styled-components/native';
import { colors } from '../../styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: ${colors.secondBackground};
  border-radius: 10px;
  margin-bottom: ${props => (props.isErrored ? 0 : 8)}px;
  border-width: 1px;
  border-color: ${colors.secondBackground};

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${colors.red};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.primary};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${colors.tertiary};
  font-size: 13px;
  font-family: 'RobotoSlab-Medium';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const ErrorMessage = styled.Text`
  color: ${colors.red};
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  padding: 4px 0 8px 8px;
`;
