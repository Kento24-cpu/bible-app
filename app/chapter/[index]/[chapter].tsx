import { FlatList, Pressable, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { BOOKS, chapterCount, getVerses } from '@/lib/bible';

export default function ChapterScreen() {
  const { index, chapter } = useLocalSearchParams<{ index: string; chapter: string }>();
  const router = useRouter();

  const bookIndex = Number(index);
  const chapterNumber = Number(chapter);

  if (
    !Number.isInteger(bookIndex) ||
    bookIndex < 0 ||
    bookIndex >= BOOKS.length ||
    !Number.isInteger(chapterNumber) ||
    chapterNumber < 1 ||
    chapterNumber > chapterCount(bookIndex)
  ) {
    return null;
  }

  const verses = getVerses(bookIndex, chapterNumber);
  const total = chapterCount(bookIndex);
  const goToChapter = (chapter: number) =>
    router.replace({
      pathname: '/chapter/[index]/[chapter]',
      params: { index: String(bookIndex), chapter: String(chapter) },
    });

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Stack.Screen options={{ title: BOOKS[bookIndex] }} />
      <View className="flex-1 px-4 pt-3">
        <FlatList
          data={verses}
          keyExtractor={(_verse, verseIndex) => String(verseIndex)}
          renderItem={({ item, index: verseIndex }) => (
            <View className="mb-2 flex-row">
              <Text className="mr-2 text-sm font-semibold text-blue-600">{verseIndex + 1}</Text>
              <Text className="flex-1 text-base leading-6 text-slate-900 dark:text-slate-100">
                {item}
              </Text>
            </View>
          )}
        />
      </View>
      <View className="flex-row items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800">
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
