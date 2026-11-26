import { Platform } from 'react-native';
import { Asset } from 'expo-asset';
import { File } from 'expo-file-system';

type BibleData = {
  translation: string;
  books: {
    name: string;
    chapters: {
      chapter: number;
      verses: { verse: number; text: string }[];
    }[];
  }[];
};

// The text is an asset file, not a module, so a code-only OTA update does not
// re-ship the 4.5 MB of verses inside the JS bundle.
let books: BibleData['books'] | null = null;

export async function loadBible(): Promise<void> {
  if (books) return;

  const [asset] = await Asset.loadAsync(require('@/assets/bible/spa-rv1909.bible'));
  const uri = asset.localUri ?? asset.uri;
  // expo-file-system has no web implementation, where the asset is served over HTTP.
  const text =
    Platform.OS === 'web' ? await (await fetch(uri)).text() : await new File(uri).text();

  books = (JSON.parse(text) as BibleData).books;
}

export const BOOKS = [
  'Génesis',
  'Éxodo',
  'Levítico',
  'Números',
  'Deuteronomio',
  'Josué',
  'Jueces',
  'Rut',
  '1 Samuel',
  '2 Samuel',
  '1 Reyes',
  '2 Reyes',
  '1 Crónicas',
  '2 Crónicas',
  'Esdras',
  'Nehemías',
  'Ester',
  'Job',
  'Salmos',
  'Proverbios',
  'Eclesiastés',
  'Cantar de los Cantares',
  'Isaías',
  'Jeremías',
  'Lamentaciones',
  'Ezequiel',
  'Daniel',
  'Oseas',
  'Joel',
  'Amós',
  'Abdías',
  'Jonás',
  'Miqueas',
  'Nahum',
  'Habacuc',
  'Sofonías',
  'Hageo',
  'Zacarías',
  'Malaquías',
  'San Mateo',
  'Marcos',
  'San Lucas',
  'Juan',
  'Hechos',
  'Romanos',
  '1 Corintios',
  '2 Corintios',
  'Gálatas',
  'Efesios',
  'Filipenses',
  'Colosenses',
  '1 Tesalonicenses',
  '2 Tesalonicenses',
  '1 Timoteo',
  '2 Timoteo',
  'Tito',
  'Filemón',
  'Hebreos',
  'Santiago',
  '1 Pedro',
  '2 Pedro',
  '1 Juan',
  '2 Juan',
  '3 Juan',
  'Judas',
  'Apocalipsis',
];

export function chapterCount(bookIndex: number): number {
  return books?.[bookIndex]?.chapters.length ?? 0;
}

export type Verse = { verse: number; text: string };

// Empty slots exist where the 1909 division and the modern verse numbering disagree.
export function getVerses(bookIndex: number, chapter: number): Verse[] {
  const verses = books?.[bookIndex]?.chapters[chapter - 1]?.verses;
  return verses ? verses.filter((verse) => verse.text.trim() !== '') : [];
}
