import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

require('react-native-reanimated/src/reanimated2/jestUtils').setUpTests();

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

global.__reanimatedWorkletInit = jest.fn();

jest.mock('react-native-reanimated', () => {
  return {
    // @ts-ignore
    ...jest.requireActual('react-native-reanimated/mock'),
    useSharedValue: jest.fn,
    useAnimatedStyle: jest.fn,
    withTiming: jest.fn,
    withSpring: jest.fn,
    withRepeat: jest.fn,
    withSequence: jest.fn,
    useAnimatedProps: jest.fn,
    Easing: {
      linear: jest.fn,
      elastic: jest.fn,
      out : jest.fn
    },
  };
});
