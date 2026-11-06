import { FlatList, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { BOOKS } from '@/lib/bible';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Text className="px-4 pb-2 pt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Biblia
      </Text>
      <FlatList
        data={BOOKS}
        keyExtractor={(_book, index) => String(index)}
        renderItem={({ item, index }) => (
          <Pressable
            className="border-b border-slate-200 px-4 py-3 dark:border-slate-800"
            onPress={() =>
              router.push({
                pathname: '/book/[index]',
                params: { index: String(index) },
              })
            }>
            <Text className="text-base text-slate-900 dark:text-slate-100">{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
