module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  setupFiles: [
    './src/__test__/jestSetup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/pages/**/*.tsx',
    'src/components/**/*.tsx',
    'src/hooks/modules/**/*.tsx',
    '!src/hooks/index.tsx',
    'src/utils/*.ts',
  ],
};
