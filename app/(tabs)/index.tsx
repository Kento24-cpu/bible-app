import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOOKS, chapterCount } from '@/lib/bible';

const OLD_TESTAMENT = BOOKS.slice(0, 39).map((title, index) => ({ title, index }));
const NEW_TESTAMENT = BOOKS.slice(39).map((title, index) => ({ title, index: index + 39 }));

const TESTAMENTS = [
  { key: 'old', label: 'Antiguo Testamento' },
  { key: 'new', label: 'Nuevo Testamento' },
] as const;

type TestamentKey = (typeof TESTAMENTS)[number]['key'];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [testamentKey, setTestamentKey] = useState<TestamentKey>('old');

  const books = testamentKey === 'old' ? OLD_TESTAMENT : NEW_TESTAMENT;

  return (
    <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: insets.top }}>
      <Text className="px-4 pb-3 pt-6 text-4xl font-bold text-slate-900 dark:text-slate-100">
        Biblia
      </Text>
      <View className="flex-row gap-2 px-4 pb-4">
        {TESTAMENTS.map(({ key, label }) => {
          const active = key === testamentKey;

          return (
            <Pressable
              key={key}
              onPress={() => setTestamentKey(key)}
              className={`flex-1 items-center rounded-full px-3 py-2 ${
                active ? 'bg-blue-600' : 'bg-slate-100 dark:bg-slate-800'
              }`}>
              <Text
                className={`text-center text-sm font-semibold ${
                  active ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                }`}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <FlatList
        key={testamentKey}
        data={books}
        keyExtractor={(item) => String(item.index)}
        contentContainerClassName="gap-2 px-4 pb-6"
        renderItem={({ item }) => {
          const count = chapterCount(item.index);

          return (
            <Pressable
              className="rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800"
              onPress={() =>
                router.push({
                  pathname: '/book/[index]',
                  params: { index: String(item.index) },
                })
              }>
              <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {item.title}
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
