import 'react-native-gesture-handler';
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';

import { Text, View, TouchableOpacity } from 'react-native';
import Main from './src';

const CustomFallback = (props: { error: Error; resetError: Function }) => (
  <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
    <Text style={{ fontSize: 56, color: '#333333' }}>Ops, Acho que ruim!</Text>
    <Text style={{ fontSize: 16, color: '#666', marginVertical: 12 }}>
      {props.error.toString()}
    </Text>
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'blue',
        borderRadius: 12,
      }}
      onPress={props.resetError}
    >
      <Text style={{ fontSize: 23, color: '#ffff' }}>Tente novamente</Text>
    </TouchableOpacity>
  </View>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={CustomFallback}>
      <Main />
    </ErrorBoundary>
  );
};

export default App;
