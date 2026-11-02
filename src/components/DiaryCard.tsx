
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  RADIUS,
  SPACE,
  TYPO,
} from '../styles/tokens';

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  moodImage: any;
  imageUri?: string | null;
  liked?: boolean;
  onPress?: () => void;
  onToggleLike?: () => void;
};

// Warna berbeda untuk setiap mood
const MOOD_COLORS: Record<
  string,
  { bg: string; text: string }
> = {
  senang: {
    bg: '#FCE2A5',
    text: '#805719',
  },
  tenang: {
    bg: '#DCCCF5',
    text: '#593783',
  },
  fokus: {
    bg: '#C8E5D5',
    text: '#356B50',
  },
  semangat: {
    bg: '#F8C6A8',
    text: '#914B2B',
  },
  santai: {
    bg: '#BFDDEB',
    text: '#315E78',
  },
  sedih: {
    bg: '#C9D1F0',
    text: '#46558B',
  },
  marah: {
    bg: '#F3B6BD',
    text: '#963C4C',
  },
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  moodImage,
  imageUri,
  liked = false,
  onPress = () => {},
  onToggleLike = () => {},
}: Props) {
  const moodColor = MOOD_COLORS[mood.toLowerCase()] ?? {
    bg: COLORS.accentSoft,
    text: COLORS.accentDeep,
  };

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={styles.main}
        accessibilityRole="button"
        accessibilityLabel={`Buka diary ${title}`}
      >
        <Image
          source={imageUri ? { uri: imageUri } : moodImage}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.date}>
            {date}
          </Text>

          <View
            style={[
              styles.moodBadge,
              { backgroundColor: moodColor.bg },
            ]}
          >
            <Text
              style={[
                styles.moodText,
                { color: moodColor.text },
              ]}
            >
              {mood.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleLike}
        style={styles.likeButton}
        accessibilityRole="button"
        accessibilityLabel={
          liked ? 'Batalkan favorit' : 'Tambahkan favorit'
        }
      >
        <Text style={styles.like}>
          {liked ? '♥' : '♡'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    marginBottom: SPACE.m,
  },

  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACE.m,
    gap: SPACE.m,
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: COLORS.accentSoft,
  },

  content: {
    flex: 1,
    gap: 4,
  },

  title: {
    color: COLORS.text,
    fontSize: TYPO.title,
    fontWeight: '800',
  },

  date: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
  },

  moodBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
  },

  moodText: {
    fontSize: 10,
    fontWeight: '800',
  },

  preview: {
    color: COLORS.text,
    fontSize: TYPO.body,
  },

  likeButton: {
    padding: SPACE.l,
    backgroundColor: COLORS.pink,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  like: {
    color: COLORS.danger,
    fontSize: 26,
  },
});
