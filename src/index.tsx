import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  RobotoSlab_500Medium,
  RobotoSlab_400Regular,
  useFonts,
} from '@expo-google-fonts/roboto-slab';
import Routes from './routes';
import AppProvider from './hooks';

const Main: React.FC = () => {
  const [fontsLoaded] = useFonts({
    RobotoSlab_500Medium,
    RobotoSlab_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export default Main;
