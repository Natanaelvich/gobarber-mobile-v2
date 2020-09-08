import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SingnIn from '../pages/SingnIn';
import SingnUp from '../pages/SingnUp';

const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Stack.Screen name="SingnIn" component={SingnIn} />
      <Stack.Screen name="SingnUp" component={SingnUp} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
