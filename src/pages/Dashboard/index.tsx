import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import TrashSwipeButton from '../../components/TrashSwipeButton';
import SectionTitle from '../../components/SectionTitle';
import HomelessCard from '../../components/HomelessCard';
import Header from '../../components/Header';
import { homelessMock } from '../../mocks/homeless';
import FloatButton from '../../components/FloatButton';
import { useAuth } from '../../hooks/auth';

import { Container, HomelessList } from './styles';

interface HomelessDependent {
  id: string;
  name: string;
  dateOfBirth: string;
}

export interface Homeless {
  id: string;
  name: string;
  avatarUrl: string;
  dateOfBirth: string;
  location: string;
  contactPhoneNumber?: string;
  riskSituation: 'low' | 'medium' | 'high';
  dependents?: HomelessDependent[];
}

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [homelessList, setHomelessList] = useState<Homeless[]>([]);

  useEffect(() => {
    setHomelessList(homelessMock);
  }, []);

  const navigateToProfileHomeless = useCallback(
    (params: Homeless) => {
      navigation.navigate('HomelessProfile', params);
    },
    [navigation.navigate],
  );

  const navigateToProfileUser = useCallback(
    (params: Homeless) => {
      navigation.navigate('UserProfile', params);
    },
    [navigation.navigate],
  );

  const renderCardSwipeRight = useCallback((homelessId: string) => {
    return (
      <TrashSwipeButton
        onTrashSwipeButtonPress={() =>
          console.warn(`Morador ${homelessId} excluído da lista`)}
      />
    );
  }, []);

  return (
    <Container>
      <Header
        institutionName="SEAL - Socieade Espiríta"
        userName={user.name}
        userAvatarUrl={user.avatarUrl}
        onProfilePress={() => navigateToProfileUser({})}
      />

      <HomelessList
        data={homelessList}
        keyExtractor={homeless => homeless.id}
        ListHeaderComponent={(
          <SectionTitle
            title="Moradores"
            sectionTitleStyles={{ marginLeft: 24 }}
          />
        )}
        renderItem={({ item: homeless }) => (
          <Swipeable
            renderRightActions={() => renderCardSwipeRight(homeless.id)}
          >
            <HomelessCard
              name={homeless.name}
              riskSituation={homeless.riskSituation}
              avatarUrl={homeless.avatarUrl}
              age={homeless.dateOfBirth}
              location={homeless.location}
              onCardPress={() => navigateToProfileHomeless(homeless)}
            />
          </Swipeable>
        )}
      />

      <FloatButton
        onFloatButtonPress={() => navigateToProfileHomeless({} as Homeless)}
      />
    </Container>
  );
};

export default Dashboard;
