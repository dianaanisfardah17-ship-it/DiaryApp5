
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Stack,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import { useEntries } from '../../src/context/EntriesContext';

import {
  COLORS,
  RADIUS,
  SPACE,
  TYPO,
} from '../../src/styles/tokens';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const {
    getById,
    likedIds,
    toggleLike,
  } = useEntries();

  const entry = getById(id);

  if (!entry) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>
          Diary tidak ditemukan.
        </Text>

        <Pressable onPress={() => router.replace('/')}>
          <Text style={styles.backText}>
            Kembali ke Home
          </Text>
        </Pressable>
      </View>
    );
  }

  const liked = likedIds.has(entry.id);

  return (
    <>
      <Stack.Screen
        options={{
          title: entry.title,
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Image
          source={
            entry.imageUri
              ? { uri: entry.imageUri }
              : entry.moodImage
          }
          style={styles.hero}
          resizeMode="cover"
        />

        <Text style={styles.title}>
          {entry.title}
        </Text>

        <Text style={styles.date}>
          {entry.date}
        </Text>

        <View style={styles.moodBadge}>
          <Text style={styles.moodText}>
            {entry.mood.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.body}>
          {entry.body}
        </Text>

        <Pressable
          onPress={() => toggleLike(entry.id)}
          style={styles.likeButton}
          accessibilityRole="button"
        >
          <Text style={styles.likeText}>
            {liked ? '♥ Disukai' : '♡ Suka'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/')}
          style={styles.homeButton}
        >
          <Text style={styles.homeText}>
            Kembali ke Home
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  content: {
    padding: SPACE.l,
    gap: SPACE.m,
    paddingBottom: SPACE.xxl,
  },

  hero: {
    width: '100%',
    height: 260,
    maxWidth: 500,
    alignSelf: 'center',
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accentSoft,
  },

  title: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: '800',
  },

  date: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
  },

  moodBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    borderRadius: 20,
  },

  moodText: {
    color: COLORS.accentDeep,
    fontWeight: '700',
    fontSize: TYPO.caption,
  },

  body: {
    color: COLORS.text,
    fontSize: TYPO.body,
    lineHeight: 24,
    marginVertical: SPACE.m,
  },

  likeButton: {
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },

  likeText: {
    color: '#D65B8A',
    fontWeight: '700',
    fontSize: TYPO.title,
  },

  homeButton: {
    backgroundColor: COLORS.accent,
    padding: SPACE.m,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },

  homeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    gap: SPACE.m,
  },

  notFound: {
    color: COLORS.text,
  },

  backText: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});
