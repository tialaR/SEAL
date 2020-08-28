import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

const avatarImg = require('../../assets/avatar.png');

export const AvatarContainer = styled.View`
  position: relative;
`;

export const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  align-self: center;
`;

export const AvatarDefault = styled.Image.attrs({
  source: avatarImg,
})`
  width: 160px;
  height: 160px;
  align-self: center;
`;

export const CameraButton = styled.TouchableOpacity`
  position: absolute;
  width: 36px;
  height: 36px;
  background: ${colors.primary};
  border-radius: 18px;
  bottom: 0;
  right: 88px;

  box-shadow: 0px 5px 10px ${colors.shadow};
  elevation: 4;

  align-items: center;
  justify-content: center;
`;
