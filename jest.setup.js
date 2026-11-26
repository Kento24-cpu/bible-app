jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default
);

// The bible text ships as an asset file read at runtime; tests read it from disk instead.
jest.mock('@/assets/bible/spa-rv1909.bible', () => 1, { virtual: true });
jest.mock('expo-asset', () => ({
  Asset: { loadAsync: async () => [{ localUri: 'file:///bible', uri: 'file:///bible' }] },
}));
jest.mock('expo-file-system', () => {
  const { readFileSync } = require('node:fs');
  const { join } = require('node:path');

  return {
    File: class {
      text() {
        return Promise.resolve(
          readFileSync(join(__dirname, 'assets/bible/spa-rv1909.bible'), 'utf8')
        );
      }
    },
  };
});
