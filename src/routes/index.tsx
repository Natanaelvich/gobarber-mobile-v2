import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './AuthRoutes';

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
};

export default Routes;
