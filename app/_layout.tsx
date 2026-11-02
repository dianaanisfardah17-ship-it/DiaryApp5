import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { EntriesProvider } from '../src/context/EntriesContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <EntriesProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FAF7FF',
            },
            headerTintColor: '#593783',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="detail/[id]"
            options={{
              title: 'Detail Diary',
            }}
          />

          <Stack.Screen
            name="about"
            options={{
              title: 'Tentang Dear Diary',
            }}
          />
        </Stack>
      </EntriesProvider>
    </SafeAreaProvider>
  );
}