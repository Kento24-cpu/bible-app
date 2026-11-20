import raw from '../assets/bible/spa-rv1909.json';
import { BOOKS, chapterCount, getVerses } from '../lib/bible';

const texts = raw.books.flatMap((book) =>
  book.chapters.flatMap((chapter) => chapter.verses.map((verse) => verse.text))
);

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
    expect(verses[15].text).toContain('amó Dios al mundo');
    expect(verses[15].verse).toBe(16);
  });

  test('skips empty slots and keeps the real verse numbers', () => {
    const job38 = getVerses(17, 38);
    expect(job38.filter((verse) => !verse.text)).toEqual([]);
    expect(job38.at(-1)?.verse).toBe(38);
  });

  test('Psalm 119 has 176 verses', () => {
    expect(getVerses(18, 119)).toHaveLength(176);
  });

  test('out of range returns empty', () => {
    expect(getVerses(999, 1)).toEqual([]);
    expect(chapterCount(-1)).toBe(0);
  });

  test('keeps every verse slot of the canon', () => {
    expect(texts).toHaveLength(31102);
  });

  test('has no printer colophons glued to the last verse of a book', () => {
    const colophon = /Amén\.\s+(La (primera|segunda)|Fu[eé] escrita|Enviada de|Escrita de|A (Tito|Filemón))/;
    expect(texts.filter((text) => colophon.test(text))).toEqual([]);
  });

  test('uses modern spanish orthography', () => {
    const obsolete = ['á', 'é', 'ó', 'fué', 'fuése', 'dió', 'vió', 'fuí', 'dí', 'ví', 'díjo', 'hé', 'pára', 'piés'];
    const hits = texts.flatMap((text) =>
      text.split(/[^\p{L}]+/u).filter((token) => obsolete.includes(token))
    );
    expect(hits).toEqual([]);
  });

  test('keeps the wording of the 1909 text untouched', () => {
    expect(getVerses(18, 23)[2]).toEqual({
      verse: 3,
      text: 'Confortará mi alma; guiaráme por sendas de justicia por amor de su nombre.',
    });
  });
});
