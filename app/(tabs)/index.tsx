import { Pressable, SectionList, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOOKS, chapterCount } from '@/lib/bible';

const OLD_TESTAMENT = BOOKS.slice(0, 39).map((title, index) => ({ title, index }));
const NEW_TESTAMENT = BOOKS.slice(39).map((title, index) => ({ title, index: index + 39 }));

const SECTIONS = [
  { title: 'Antiguo Testamento', data: OLD_TESTAMENT },
  { title: 'Nuevo Testamento', data: NEW_TESTAMENT },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: insets.top }}>
      <Text className="px-4 pb-2 pt-6 text-4xl font-bold text-slate-900 dark:text-slate-100">
        Biblia
      </Text>
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => String(item.index)}
        contentContainerClassName="px-4 pb-6"
        stickySectionHeadersEnabled={false}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderSectionHeader={({ section }) => (
          <Text className="px-1 pb-2 pt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {section.title}
          </Text>
        )}
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
