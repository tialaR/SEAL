import React from 'react';

import {
  HeaderContainer,
  HeaderTitle,
  UserName,
  UserAvatar,
  UserAvatarDefault,
  UserProfileButton,
} from './styles';

interface HeaderProps {
  institutionName: string;
  userName: string;
  userAvatarUrl: string;
  onProfilePress: () => void;
}

const Header: React.FC<HeaderProps> = ({
  institutionName,
  userName,
  userAvatarUrl,
  onProfilePress,
}: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderTitle>
        {institutionName} {'\n'}
        <UserName>{userName}</UserName>
      </HeaderTitle>

      <UserProfileButton onPress={onProfilePress}>
        {userAvatarUrl && userAvatarUrl != null ? (
          <UserAvatar source={{ uri: userAvatarUrl }} />
        ) : (
          <UserAvatarDefault />
        )}
      </UserProfileButton>
    </HeaderContainer>
  );
};

export default Header;
