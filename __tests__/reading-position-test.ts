import AsyncStorage from '@react-native-async-storage/async-storage';

import { getReadingPosition, saveReadingPosition } from '../lib/reading-position';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('reading position', () => {
  test('saves and restores a valid position', async () => {
    await saveReadingPosition({ bookIndex: 42, chapter: 3, verse: 16 });

    await expect(getReadingPosition()).resolves.toEqual({
      bookIndex: 42,
      chapter: 3,
      verse: 16,
    });
  });

  test('returns null when nothing is stored', async () => {
    await expect(getReadingPosition()).resolves.toBeNull();
  });

  test('ignores invalid or out-of-range data', async () => {
    await AsyncStorage.setItem('reading-position', '{"bookIndex":999,"chapter":1,"verse":1}');
    await expect(getReadingPosition()).resolves.toBeNull();

    await AsyncStorage.setItem('reading-position', 'not json');
    await expect(getReadingPosition()).resolves.toBeNull();
  });
});
