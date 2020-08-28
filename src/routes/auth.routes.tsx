import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import { colors } from '../styles/colors';

const Auth = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
