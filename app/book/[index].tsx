import { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOOKS, chapterCount } from '@/lib/bible';
import { getReadingPosition, type ReadingPosition } from '@/lib/reading-position';

const COLUMNS = 5;
const H_PADDING = 16;
const GAP = 8;

export default function BookScreen() {
  const { index } = useLocalSearchParams<{ index: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [position, setPosition] = useState<ReadingPosition | null>(null);

  const bookIndex = Number(index);
  const valid = Number.isInteger(bookIndex) && bookIndex >= 0 && bookIndex < BOOKS.length;

  useFocusEffect(
    useCallback(() => {
      let active = true;

      getReadingPosition().then((saved) => {
        if (active) setPosition(saved);
      });

      return () => {
        active = false;
      };
    }, [])
  );

  if (!valid) {
    return null;
  }

  const chapters = Array.from({ length: chapterCount(bookIndex) }, (_, i) => i + 1);
  const cellSize = Math.floor((width - H_PADDING * 2 - GAP * (COLUMNS - 1)) / COLUMNS);
  const currentChapter = position?.bookIndex === bookIndex ? position.chapter : null;

  return (
    <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: insets.top }}>
      <View className="px-4 pt-3">
        <Pressable hitSlop={8} onPress={() => router.back()} className="self-start py-1">
          <Text className="text-base font-semibold text-blue-600">Atrás</Text>
        </Pressable>
        <Text className="mt-2 text-4xl font-bold text-slate-900 dark:text-slate-100">
          {BOOKS[bookIndex]}
        </Text>
        <Text className="mt-1 text-base text-slate-600 dark:text-slate-400">
          Elige un capítulo
        </Text>
      </View>
      <FlatList
        data={chapters}
        keyExtractor={(chapter) => String(chapter)}
        numColumns={COLUMNS}
        columnWrapperClassName="gap-2"
        contentContainerClassName="gap-2 px-4 pt-4 pb-6"
        renderItem={({ item }) => {
          const isCurrent = item === currentChapter;

          return (
            <Pressable
              style={{ width: cellSize, height: cellSize }}
              className={`items-center justify-center rounded-2xl ${
                isCurrent ? 'bg-blue-500' : 'bg-blue-50 dark:bg-slate-800'
              }`}
              onPress={() =>
                router.push({
                  pathname: '/chapter/[index]/[chapter]',
                  params: { index: String(bookIndex), chapter: String(item) },
                })
              }>
              <Text
                className={`text-base font-medium ${
                  isCurrent ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                }`}>
                {item}
              </Text>
            </Pressable>
          );
        }}
        ListFooterComponent={
          position ? (
            <Pressable
              className="mt-4 rounded-2xl bg-blue-100 px-4 py-3 dark:bg-blue-950"
              onPress={() =>
                router.push({
                  pathname: '/chapter/[index]/[chapter]',
                  params: {
                    index: String(position.bookIndex),
                    chapter: String(position.chapter),
                  },
                })
              }>
              <Text className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Continuar leyendo
              </Text>
              <Text className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                {`${BOOKS[position.bookIndex]} ${position.chapter}:${position.verse}`}
              </Text>
            </Pressable>
          ) : undefined
        }
      />
    </View>
  );
}
