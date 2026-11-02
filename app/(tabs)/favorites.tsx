
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import DiaryCard from '../../src/components/DiaryCard';
import { useEntries } from '../../src/context/EntriesContext';

import {
  COLORS,
  SPACE,
  TYPO,
} from '../../src/styles/tokens';

export default function FavoritesScreen() {
  const router = useRouter();

  const {
    entries,
    likedIds,
    toggleLike,
  } = useEntries();

  const favorites = entries.filter((entry) =>
    likedIds.has(entry.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cerita Favorit ♡
      </Text>

      <Text style={styles.subtitle}>
        Momen yang ingin kamu simpan.
      </Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>
              ♡
            </Text>

            <Text style={styles.emptyTitle}>
              Belum ada cerita favorit
            </Text>

            <Text style={styles.subtitle}>
              Tekan ikon hati pada diary untuk menyimpannya.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
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
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: SPACE.l,
  },
  title: {
    color: COLORS.text,
    fontSize: TYPO.h1,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.muted,
    marginTop: 5,
    marginBottom: SPACE.l,
  },
  list: {
    paddingBottom: SPACE.xl,
    flexGrow: 1,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACE.xl,
  },
  emptyIcon: {
    color: COLORS.accent,
    fontSize: 50,
  },
  emptyTitle: {
    color: COLORS.text,
    fontWeight: '800',
    marginTop: SPACE.m,
  },
});
