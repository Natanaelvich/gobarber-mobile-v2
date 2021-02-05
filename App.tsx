import 'react-native-gesture-handler';
import React from 'react';
import Bugsnag from '@bugsnag/expo';
import { Text, View } from 'react-native';
import Main from './src';

Bugsnag.start();

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const App: React.FC = () => {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>Tem um erro oh</Text>
        </View>
      )}
    >
      <Main />
    </ErrorBoundary>
  );
};

export default App;
