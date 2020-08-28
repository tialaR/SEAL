import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../styles/colors';

import {AvatarContainer, Avatar, AvatarDefault, CameraButton} from './styles';

interface AvatarProfileProps {
  avatar: string;
  onChangeAvatar: () => void;
}

const AvatarProfile: React.FC<AvatarProfileProps> = ({
  avatar,
  onChangeAvatar,
}: AvatarProfileProps) => {
  return (
    <AvatarContainer>
      {avatar ? <Avatar source={{uri: avatar}} /> : <AvatarDefault />}
      <CameraButton onPress={onChangeAvatar}>
        <Icon name="camera" size={17} color={colors.white} />
      </CameraButton>
    </AvatarContainer>
  );
};

export default AvatarProfile;
