import { Stack, useRouter } from "expo-router";
import { View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeContextProvider, useTheme } from '@/contexts/ThemeContext';
import IconButton from "@/components/IconButton";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContextProvider>
        <AppStack />
      </ThemeContextProvider>
    </GestureHandlerRootView>
  )
}

function AppStack() {
  const { colors } = useTheme();
  const router = useRouter();
  const title = { title: 'Theme Parks Live' }

  return (
    <Stack screenOptions={{
      headerBackButtonDisplayMode: 'minimal',
      headerBackground: () => (
        <LinearGradient
          colors={[colors.primaryContainer, colors.surface]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 16 }}>
          <IconButton icon="settings-outline" color={colors.onSurface} onPress={() => router.push("/change-theme")} />
        </View>
      ),
      unstable_headerRightItems: () => [
        {
          type: 'button',
          label: 'Theme settings',
          icon: { type: 'sfSymbol', name: 'gearshape' },
          tintColor: colors.onSurface,
          hidesSharedBackground: true,
          onPress: () => router.push("/change-theme"),
        },
      ],
      headerTintColor: colors.onSurface,
      headerShadowVisible: false
    }}>
      <Stack.Screen name="(tabs)" options={title} />
      <Stack.Screen name="park-info" options={title} />
      <Stack.Screen name="change-theme" options={{ title: 'Theme', headerRight: () => null, unstable_headerRightItems: () => [] }} />
      <Stack.Screen name="pick-park" options={{ title: 'Choose a park!' }} />
      <Stack.Screen name="pick-ride" options={{ title: 'Choose a ride!' }} />
    </Stack>
  )
}
