// Rota para quando o usuário estiver autenticado na aplicação
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';

import { Platform } from 'react-native';
import { colors } from '../styles/colors';

import Dashboard from '../pages/Dashboard';
import HomelessProfile from '../pages/HomelessProfile';
import UserProfile from '../pages/UserProfile';
import Map from '../pages/Map';
import Team from '../pages/Team';

const App = createStackNavigator();
const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  color: string;
}

const TabsRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.secondary,
        style: {
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          backgroundColor: colors.background,
          shadowColor: colors.shadow,
          ...Platform.select({
            ios: {
              shadowOffset: { height: 2, width: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 20,
            },
            android: {
              elevation: 6,
            },
          }),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Icon name="home" color={color} size={22} />
          ),
        }}
      />

      {/* Fluxo da lista do time */}
      <Tab.Screen
        name="Team"
        component={Team}
        options={{
          tabBarLabel: 'Equipe',
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Icon name="users" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppRoutes = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      {/* Fluxo da listagem de moradores */}
      <App.Screen name="TabsRoutes" component={TabsRoutes} />

      {/* Fluxo do Perfil do morador */}
      <App.Screen name="HomelessProfile" component={HomelessProfile} />

      {/* Fluxo do Mapa */}
      <App.Screen name="Map" component={Map} />

      {/* Fluxo do Perfil do usuáio */}
      <App.Screen name="UserProfile" component={UserProfile} />
    </App.Navigator>
  );
};

export default AppRoutes;
