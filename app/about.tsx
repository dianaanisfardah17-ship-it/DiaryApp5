
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  RADIUS,
  SPACE,
  TYPO,
} from '../src/styles/tokens';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>✿</Text>
      </View>

      <Text style={styles.title}>
        Dear Diary
      </Text>

      <Text style={styles.description}>
        Aplikasi catatan harian untuk menyimpan cerita,
        pengalaman, foto, dan suasana hati setiap hari.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Dikembangkan oleh
        </Text>

        <Text style={styles.name}>
          Diana Anis Fardah
        </Text>

        <Text style={styles.detail}>
          NIM: 2430511046
        </Text>

        <Text style={styles.detail}>
          Teknik Informatika
        </Text>

        <Text style={styles.detail}>
          Universitas Muhammadiyah Sukabumi
        </Text>
      </View>

      <Text style={styles.version}>
        Dear Diary • Version 1.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACE.xl,
  },
  iconBox: {
    width: 85,
    height: 85,
    backgroundColor: COLORS.accentSoft,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
    color: COLORS.accent,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: SPACE.m,
  },
  description: {
    textAlign: 'center',
    color: COLORS.muted,
    lineHeight: 23,
    marginVertical: SPACE.l,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.card,
    padding: SPACE.l,
    alignItems: 'center',
  },
  label: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
  },
  name: {
    color: COLORS.accent,
    fontSize: TYPO.title,
    fontWeight: '800',
    marginTop: SPACE.s,
  },
  detail: {
    color: COLORS.text,
    marginTop: SPACE.s,
    textAlign: 'center',
  },
  version: {
    color: COLORS.muted,
    marginTop: SPACE.xl,
    fontSize: TYPO.caption,
  },
});