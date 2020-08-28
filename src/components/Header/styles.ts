import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors } from '../../styles/colors';

const avatarImg = require('../../assets/avatar.png');

export const HeaderContainer = styled.View`
  padding: 20px 24px;
  background-color: ${colors.background};

  padding-top: ${getStatusBarHeight() + 24}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0px 5px 10px ${colors.shadow};
  elevation: 4;
`;

export const HeaderTitle = styled.Text`
  color: ${colors.primary};
  font-size: 21px;
  font-family: 'RobotoSlab-Medium';
  line-height: 24px;
`;

export const UserName = styled.Text`
  color: ${colors.tertiary};
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const UserAvatarDefault = styled.Image.attrs({
  source: avatarImg,
})`
  width: 56px;
  height: 56px;
  align-self: center;
`;

export const UserProfileButton = styled.TouchableOpacity``;
