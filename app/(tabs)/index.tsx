
import { useMemo, useState } from 'react';

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import DiaryCard from '../../src/components/DiaryCard';
import { useEntries } from '../../src/context/EntriesContext';

import {
  BREAKPOINTS,
  COLORS,
  MAX_WIDTH,
  SPACE,
  TYPO,
} from '../../src/styles/tokens';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const twoColumns = width >= BREAKPOINTS.tablet;

  const {
    entries,
    likedIds,
    toggleLike,
  } = useEntries();

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return entries;

    return entries.filter((entry) =>
      [
        entry.title,
        entry.date,
        entry.preview,
        entry.body,
        entry.mood,
      ].some((value) =>
        value.toLowerCase().includes(q)
      )
    );
  }, [entries, query]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.heading}>
          <Text style={styles.title}>
            Buku Harian
          </Text>

          <Text style={styles.subtitle}>
            Setiap hari punya cerita.
          </Text>
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Cari judul, tanggal, atau mood..."
          placeholderTextColor={COLORS.muted}
          style={styles.search}
          accessibilityLabel="Cari diary"
        />

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>
            Semua Cerita ✧
          </Text>

          <Text style={styles.count}>
            {filtered.length} entri
          </Text>
        </View>

        <FlatList
          key={twoColumns ? 'two-columns' : 'one-column'}
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          numColumns={twoColumns ? 2 : 1}
          columnWrapperStyle={
            twoColumns ? styles.columnWrapper : undefined
          }
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>
                Belum ada cerita ditemukan ♡
              </Text>

              <Text style={styles.subtitle}>
                Coba kata kunci pencarian lainnya.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={twoColumns ? styles.gridItem : undefined}
            >
              <DiaryCard
                title={item.title}
                date={item.date}
                preview={item.preview}
                mood={item.mood}
                moodImage={item.moodImage}
                imageUri={item.imageUri}
                liked={likedIds.has(item.id)}
                onToggleLike={() => toggleLike(item.id)}
                onPress={() =>
                  router.push({
                    pathname: '/detail/[id]',
                    params: {
                      id: String(item.id),
                    },
                  } as any)
                }
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
    padding: SPACE.l,
  },
  heading: {
    marginBottom: SPACE.l,
  },
  title: {
    color: COLORS.text,
    fontSize: TYPO.h1,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.muted,
    marginTop: 4,
  },
  search: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: SPACE.l,
    paddingVertical: 14,
    color: COLORS.text,
    marginBottom: SPACE.l,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACE.m,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: TYPO.title,
    fontWeight: '800',
  },
  count: {
    color: COLORS.muted,
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: TYPO.caption,
  },
  list: {
    paddingBottom: SPACE.xl,
    flexGrow: 1,
  },
  columnWrapper: {
    gap: SPACE.m,
  },
  gridItem: {
    flex: 1,
  },
  empty: {
    alignItems: 'center',
    padding: SPACE.xl,
  },
  emptyTitle: {
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: SPACE.s,
  },
});
