import { BOOKS, chapterCount, getVerses } from '../lib/bible';

describe('bible data', () => {
  test('has the 66 books in canonical order', () => {
    expect(BOOKS).toHaveLength(66);
    expect(BOOKS[0]).toBe('Génesis');
    expect(BOOKS[42]).toBe('Juan');
    expect(BOOKS[65]).toBe('Apocalipsis');
  });

  test('chapter counts', () => {
    expect(chapterCount(0)).toBe(50);
    expect(chapterCount(18)).toBe(150);
    expect(chapterCount(65)).toBe(22);
  });

  test('John 3:16', () => {
    const verses = getVerses(42, 3);
    expect(verses).toHaveLength(36);
    expect(verses[15]).toContain('amó Dios al mundo');
  });

  test('Psalm 119 has 176 verses', () => {
    expect(getVerses(18, 119)).toHaveLength(176);
  });

  test('out of range returns empty', () => {
    expect(getVerses(999, 1)).toEqual([]);
    expect(chapterCount(-1)).toBe(0);
  });
});
