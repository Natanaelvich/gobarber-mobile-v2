import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import AuthRoutes from './AuthRoutes';
import Dashboard from '../pages/Dashboard';
import { useAuth } from '../hooks/modules/AuthContext';
import Profile from '../pages/Profile';
import AppointmentDatePicker from '../pages/AppointmentDatePicker';
import AppointmentCreated from '../pages/AppointmentCreated';

const Stack = createStackNavigator();
const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator
          headerMode="none"
          screenOptions={{
            cardStyle: { backgroundColor: '#312e38' },
          }}
        >
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen
            name="AppointmentDatePicker"
            component={AppointmentDatePicker}
          />
          <Stack.Screen
            name="AppointmentCreated"
            component={AppointmentCreated}
          />
        </Stack.Navigator>
      ) : (
        <AuthRoutes />
      )}
    </NavigationContainer>
  );
};

export default Routes;
