import { useState } from 'react';

import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

import {
  Mood,
  useEntries,
} from '../../src/context/EntriesContext';

import {
  COLORS,
  RADIUS,
  SPACE,
  TYPO,
} from '../../src/styles/tokens';

const MOODS: Mood[] = [
  'senang',
  'tenang',
  'fokus',
  'semangat',
  'santai',
  'sedih',
  'marah',
];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useEntries();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [preview, setPreview] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState<Mood>('senang');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Izin diperlukan',
        'Izinkan aplikasi mengakses galeri untuk memilih foto.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const getMoodImage = () => {
    switch (mood) {
      case 'tenang':
        return require('../../assets/moods/pagi.jpeg');

      case 'fokus':
        return require('../../assets/moods/produktif.jpeg');

      case 'santai':
        return require('../../assets/moods/senja.jpeg');

      default:
        return require('../../assets/moods/makan.jpeg');
    }
  };

  const canSave =
    title.trim().length > 0 &&
    preview.trim().length > 0;

  const save = () => {
    if (!canSave) {
      Alert.alert(
        'Data belum lengkap',
        'Isi judul dan ringkasan diary terlebih dahulu.'
      );
      return;
    }

    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: preview.trim(),
      body: body.trim() || preview.trim(),
      mood,
      moodImage: getMoodImage(),
      imageUri,
    });

    Alert.alert('Berhasil', 'Diary berhasil ditambahkan.');

    router.replace('/');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Tulis Ceritamu ✿
      </Text>

      <Text style={styles.subtitle}>
        Simpan momen kecil yang berarti.
      </Text>

      <Text style={styles.label}>Foto Diary</Text>

      <Pressable
        style={styles.photoButton}
        onPress={pickImage}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.previewImage}
          />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoIcon}>＋</Text>
            <Text style={styles.photoText}>
              Pilih foto dari galeri
            </Text>
          </View>
        )}
      </Pressable>

      {imageUri && (
        <Pressable
          onPress={() => setImageUri(null)}
          style={styles.removePhoto}
        >
          <Text style={styles.removePhotoText}>
            Hapus foto
          </Text>
        </Pressable>
      )}

      <Text style={styles.label}>Judul Diary</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Masukkan judul cerita..."
        placeholderTextColor={COLORS.muted}
        style={styles.input}
      />

      <Text style={styles.label}>Tanggal</Text>

      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={COLORS.muted}
        style={styles.input}
      />

      <Text style={styles.label}>Ringkasan</Text>

      <TextInput
        value={preview}
        onChangeText={setPreview}
        placeholder="Ceritakan secara singkat..."
        placeholderTextColor={COLORS.muted}
        style={styles.input}
      />

      <Text style={styles.label}>Isi Cerita</Text>

      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Tuliskan cerita lengkapmu..."
        placeholderTextColor={COLORS.muted}
        style={[styles.input, styles.multiline]}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>
        Bagaimana suasana hatimu?
      </Text>

      <View style={styles.moodContainer}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[
              styles.moodOption,
              mood === item && styles.moodSelected,
            ]}
          >
            <Text
              style={[
                styles.moodOptionText,
                mood === item && styles.moodSelectedText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={save}
        disabled={!canSave}
        style={[
          styles.button,
          !canSave && styles.disabled,
        ]}
      >
        <Text style={styles.buttonText}>
          Simpan Diary
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: SPACE.l,
    paddingBottom: SPACE.xxl,
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
  label: {
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: SPACE.s,
    marginTop: SPACE.m,
  },
  photoButton: {
    width: '100%',
    height: 190,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.accentSoft,
  },
  photoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIcon: {
    color: COLORS.accent,
    fontSize: 40,
  },
  photoText: {
    color: COLORS.accentDeep,
    fontWeight: '700',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removePhoto: {
    alignSelf: 'flex-end',
    padding: SPACE.s,
  },
  removePhotoText: {
    color: '#C45B82',
    fontWeight: '700',
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.input,
    padding: SPACE.m,
    color: COLORS.text,
  },
  multiline: {
    minHeight: 120,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.s,
  },
  moodOption: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    borderRadius: 20,
  },
  moodSelected: {
    backgroundColor: COLORS.accentSoft,
    borderColor: COLORS.accent,
  },
  moodOptionText: {
    color: COLORS.muted,
    textTransform: 'capitalize',
  },
  moodSelectedText: {
    color: COLORS.accentDeep,
    fontWeight: '700',
  },
  button: {
    backgroundColor: COLORS.accent,
    padding: SPACE.l,
    borderRadius: RADIUS.button,
    alignItems: 'center',
    marginTop: SPACE.xl,
  },
  disabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});