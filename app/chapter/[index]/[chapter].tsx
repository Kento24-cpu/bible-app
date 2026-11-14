import { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOOKS, chapterCount, getVerses } from '@/lib/bible';
import { getReadingPosition, saveReadingPosition } from '@/lib/reading-position';

export default function ChapterScreen() {
  const { index, chapter } = useLocalSearchParams<{ index: string; chapter: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

  const bookIndex = Number(index);
  const chapterNumber = Number(chapter);
  const valid =
    Number.isInteger(bookIndex) &&
    bookIndex >= 0 &&
    bookIndex < BOOKS.length &&
    Number.isInteger(chapterNumber) &&
    chapterNumber >= 1 &&
    chapterNumber <= chapterCount(bookIndex);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      setSelectedVerse(null);
      getReadingPosition().then((saved) => {
        if (
          active &&
          saved?.bookIndex === bookIndex &&
          saved.chapter === chapterNumber
        ) {
          setSelectedVerse(saved.verse);
        }
      });

      return () => {
        active = false;
      };
    }, [bookIndex, chapterNumber])
  );

  if (!valid) {
    return null;
  }

  const verses = getVerses(bookIndex, chapterNumber);
  const total = chapterCount(bookIndex);
  const goToChapter = (value: number) =>
    router.replace({
      pathname: '/chapter/[index]/[chapter]',
      params: { index: String(bookIndex), chapter: String(value) },
    });

  const selectVerse = (verse: number) => {
    setSelectedVerse(verse);
    void saveReadingPosition({ bookIndex, chapter: chapterNumber, verse }).catch(() => {});
  };

  return (
    <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-4 pt-3">
        <Pressable hitSlop={8} onPress={() => router.back()} className="py-1">
          <Text className="text-base font-semibold text-blue-600">Atrás</Text>
        </Pressable>
        <View className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
          <Text className="text-sm font-semibold text-slate-600 dark:text-slate-300">RV1909</Text>
        </View>
      </View>
      <Text className="px-4 pb-3 pt-3 text-4xl font-bold text-slate-900 dark:text-slate-100">
        {`${BOOKS[bookIndex]} ${chapterNumber}`}
      </Text>
      <FlatList
        data={verses}
        keyExtractor={(_verse, verseIndex) => String(verseIndex)}
        contentContainerClassName="gap-1 px-3 pb-6"
        renderItem={({ item, index: verseIndex }) => {
          const verse = verseIndex + 1;
          const selected = verse === selectedVerse;

          return (
            <Pressable
              onPress={() => selectVerse(verse)}
              style={selected ? { backgroundColor: '#659DF2' } : undefined}
              className="rounded-2xl px-3 py-2">
              <Text
                className={`text-base leading-7 ${
                  selected ? 'text-white' : 'text-slate-800 dark:text-slate-200'
                }`}>
                <Text
                  className={`font-semibold ${
                    selected ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                  }`}>
                  {verse}{' '}
                </Text>
                {item}
              </Text>
            </Pressable>
          );
        }}
      />
      <View
        className="flex-row items-center justify-between border-t border-slate-200 px-4 pt-3 dark:border-slate-800"
        style={{ paddingBottom: insets.bottom + 12 }}>
        {chapterNumber > 1 ? (
          <Pressable onPress={() => goToChapter(chapterNumber - 1)}>
            <Text className="text-base text-blue-600">Anterior</Text>
          </Pressable>
        ) : (
          <View />
        )}
        <Text className="text-sm text-slate-500 dark:text-slate-400">
          {`${chapterNumber} / ${total}`}
        </Text>
        {chapterNumber < total ? (
          <Pressable onPress={() => goToChapter(chapterNumber + 1)}>
            <Text className="text-base text-blue-600">Siguiente</Text>
          </Pressable>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}
