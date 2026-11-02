import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Mood =
  | 'senang'
  | 'tenang'
  | 'fokus'
  | 'semangat'
  | 'santai'
  | 'sedih'
  | 'marah';

export type Entry = {
  id: number;
  title: string;
  date: string;
  preview: string;
  body: string;
  mood: Mood;
  moodImage: any;
  imageUri?: string | null;
};

type NewEntry = Omit<Entry, 'id'>;

type EntriesContextType = {
  entries: Entry[];
  likedIds: Set<number>;
  addEntry: (entry: NewEntry) => void;
  getById: (id: string | number) => Entry | undefined;
  toggleLike: (id: number) => void;
};

const EntriesContext =
  createContext<EntriesContextType | null>(null);


const INITIAL_ENTRIES: Entry[] = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-10-18',
    preview: 'Menikmati udara segar di pagi hari.',
    body: 'Hari ini aku bangun lebih pagi dan menikmati udara segar. Rasanya menyenangkan memulai hari dengan suasana yang tenang.',
    mood: 'tenang',
    moodImage: require('../../assets/moods/pagi.jpeg'),
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-10-19',
    preview: 'Menyelesaikan tugas dan berdiskusi bersama teman.',
    body: 'Hari ini cukup produktif karena beberapa tugas berhasil diselesaikan. Aku juga berdiskusi bersama teman untuk mengembangkan ide proyek.',
    mood: 'fokus',
    moodImage: require('../../assets/moods/produktif.jpeg'),
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2026-10-20',
    preview: 'Menikmati suasana sore yang indah.',
    body: 'Sore ini aku menikmati suasana senja. Langit terlihat cantik dan membuat pikiran terasa lebih tenang.',
    mood: 'santai',
    moodImage: require('../../assets/moods/senja.jpeg'),
  },
  {
    id: 4,
    title: 'Hari yang Membahagiakan',
    date: '2026-10-21',
    preview: 'Banyak hal kecil yang membuatku tersenyum.',
    body: 'Hari ini terasa sangat menyenangkan. Aku bisa menghabiskan waktu bersama orang-orang terdekat, tertawa, dan menikmati momen sederhana yang membuat hati bahagia.',
    mood: 'senang',
    moodImage: require('../../assets/moods/senang.jpeg'),
  },
  {
    id: 5,
    title: 'Semangat Mengejar Impian',
    date: '2026-10-22',
    preview: 'Memulai hari dengan motivasi baru.',
    body: 'Aku ingin terus berkembang dan tidak mudah menyerah. Hari ini aku mencoba menyelesaikan hal-hal yang sebelumnya tertunda. Semoga usaha kecil hari ini membawa hasil baik.',
    mood: 'semangat',
    moodImage: require('../../assets/moods/semangat.jpeg'),
  },
];

export function EntriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entries, setEntries] =
    useState<Entry[]>(INITIAL_ENTRIES);

  const [likedIds, setLikedIds] =
    useState<Set<number>>(new Set());

  const addEntry = (entry: NewEntry) => {
    setEntries((previous) => [
      {
        id: Date.now(),
        ...entry,
      },
      ...previous,
    ]);
  };

  const getById = (id: string | number) => {
    return entries.find(
      (entry) => entry.id === Number(id)
    );
  };

  const toggleLike = (id: number) => {
    setLikedIds((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const value = useMemo(
    () => ({
      entries,
      likedIds,
      addEntry,
      getById,
      toggleLike,
    }),
    [entries, likedIds]
  );

  return (
    <EntriesContext.Provider value={value}>
      {children}
    </EntriesContext.Provider>
  );
}

export function useEntries() {
  const context = useContext(EntriesContext);

  if (!context) {
    throw new Error(
      'useEntries harus berada di dalam EntriesProvider'
    );
  }

  return context;
}