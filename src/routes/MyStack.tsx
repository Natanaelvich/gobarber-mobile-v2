import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import SingnIn from '../pages/SingnIn';
import SingnUp from '../pages/SingnUp';

enableScreens();
const Stack = createNativeStackNavigator();

const MyStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SingnIn" component={SingnIn} />
      <Stack.Screen name="SingnUp" component={SingnUp} />
    </Stack.Navigator>
  );
};

export default MyStack;
