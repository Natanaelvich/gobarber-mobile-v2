import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

require('react-native-reanimated/src/reanimated2/jestUtils').setUpTests();

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
