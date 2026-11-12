import AsyncStorage from '@react-native-async-storage/async-storage';

import { BOOKS, chapterCount, getVerses } from '@/lib/bible';

export type ReadingPosition = { bookIndex: number; chapter: number; verse: number };

const KEY = 'reading-position';

function isValid(value: unknown): value is ReadingPosition {
  if (typeof value !== 'object' || value === null) return false;

  const { bookIndex, chapter, verse } = value as ReadingPosition;

  return (
    Number.isInteger(bookIndex) &&
    bookIndex >= 0 &&
    bookIndex < BOOKS.length &&
    Number.isInteger(chapter) &&
    chapter >= 1 &&
    chapter <= chapterCount(bookIndex) &&
    Number.isInteger(verse) &&
    verse >= 1 &&
    verse <= getVerses(bookIndex, chapter).length
  );
}

export async function getReadingPosition(): Promise<ReadingPosition | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function saveReadingPosition(position: ReadingPosition): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(position));
}
