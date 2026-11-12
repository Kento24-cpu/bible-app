import { FlatList, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOOKS, chapterCount } from '@/lib/bible';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: insets.top }}>
      <Text className="px-4 pb-4 pt-6 text-4xl font-bold text-slate-900 dark:text-slate-100">
        Libros
      </Text>
      <FlatList
        data={BOOKS}
        keyExtractor={(_book, index) => String(index)}
        contentContainerClassName="gap-2 px-4 pb-6"
        renderItem={({ item, index }) => {
          const count = chapterCount(index);

          return (
            <Pressable
              className="rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800"
              onPress={() =>
                router.push({
                  pathname: '/book/[index]',
                  params: { index: String(index) },
                })
              }>
              <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {item}
              </Text>
              <Text className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                {`${count} ${count === 1 ? 'capítulo' : 'capítulos'}`}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
