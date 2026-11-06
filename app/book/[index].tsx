import { FlatList, Pressable, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { BOOKS, chapterCount } from '@/lib/bible';

export default function BookScreen() {
  const { index } = useLocalSearchParams<{ index: string }>();
  const router = useRouter();

  const bookIndex = Number(index);

  if (!Number.isInteger(bookIndex) || bookIndex < 0 || bookIndex >= BOOKS.length) {
    return null;
  }

  const chapters = Array.from({ length: chapterCount(bookIndex) }, (_, i) => i + 1);

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Stack.Screen options={{ title: BOOKS[bookIndex] }} />
      <View className="flex-1 px-3 pt-3">
        <FlatList
          data={chapters}
          keyExtractor={(chapter) => String(chapter)}
          numColumns={5}
          renderItem={({ item }) => (
            <Pressable
              className="mb-2 mr-2 h-12 w-16 items-center justify-center rounded bg-slate-100 dark:bg-slate-800"
              onPress={() =>
                router.push({
                  pathname: '/chapter/[index]/[chapter]',
                  params: { index: String(bookIndex), chapter: String(item) },
                })
              }>
              <Text className="text-base text-slate-900 dark:text-slate-100">{item}</Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}
