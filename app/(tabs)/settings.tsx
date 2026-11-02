import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useRouter } from 'expo-router';

import {
    COLORS,
    RADIUS,
    SPACE,
    TYPO,
} from '../../src/styles/tokens';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pengaturan
      </Text>

      <Text style={styles.subtitle}>
        Pengaturan dan informasi aplikasi.
      </Text>

      <Pressable
        style={styles.card}
        onPress={() => router.push('/about' as any)}
      >
        <Text style={styles.cardTitle}>
          ✿ Tentang Dear Diary
        </Text>

        <Text style={styles.description}>
          Informasi aplikasi dan pengembang.
        </Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Versi Aplikasi
        </Text>

        <Text style={styles.description}>
          Dear Diary Version 1.0
        </Text>
      </View>
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
    fontSize: TYPO.h1,
    color: COLORS.text,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.muted,
    marginTop: 5,
    marginBottom: SPACE.l,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.card,
    padding: SPACE.l,
    marginBottom: SPACE.m,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: TYPO.title,
    fontWeight: '700',
  },
  description: {
    color: COLORS.muted,
    marginTop: SPACE.s,
  },
});