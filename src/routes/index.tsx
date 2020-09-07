import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './MyStack';

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default Routes;
