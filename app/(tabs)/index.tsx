import { useState } from 'react';
import { Pressable, SectionList, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BOOKS, chapterCount } from '@/lib/bible';

const OLD_TESTAMENT = BOOKS.slice(0, 39).map((title, index) => ({ title, index }));
const NEW_TESTAMENT = BOOKS.slice(39).map((title, index) => ({ title, index: index + 39 }));

const SECTIONS = [
  { key: 'old', title: 'Antiguo Testamento', data: OLD_TESTAMENT },
  { key: 'new', title: 'Nuevo Testamento', data: NEW_TESTAMENT },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const sections = SECTIONS.map((section) => ({
    ...section,
    data: expanded[section.key] ? section.data : [],
  }));

  return (
    <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: insets.top }}>
      <Text className="px-4 pb-2 pt-6 text-4xl font-bold text-slate-900 dark:text-slate-100">
        Biblia
      </Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => String(item.index)}
        contentContainerClassName="px-4 pb-6"
        stickySectionHeadersEnabled={false}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderSectionHeader={({ section }) => {
          const open = Boolean(expanded[section.key]);

          return (
            <Pressable
              className="mb-2 mt-2 flex-row items-center justify-between px-1 py-2"
              onPress={() =>
                setExpanded((prev) => ({ ...prev, [section.key]: !prev[section.key] }))
              }>
              <Text className="text-base font-semibold text-slate-600 dark:text-slate-300">
                {section.title}
              </Text>
              <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color="#64748b" />
            </Pressable>
          );
        }}
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
