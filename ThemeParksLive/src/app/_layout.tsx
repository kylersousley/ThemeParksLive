import { router, Stack } from "expo-router";
import { View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContextProvider, useTheme } from '@/contexts/ThemeContext';
import IconButton from "@/components/IconButton";

export default function RootLayout() {
  return (
    <ThemeContextProvider>
      <AppStack />
    </ThemeContextProvider>
  )
}

function AppStack() {
  const { colors } = useTheme();
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
      headerTintColor: colors.onSurface,
      headerShadowVisible: false
    }}>
      <Stack.Screen name="(tabs)" options={title} />
      <Stack.Screen name="park-info" options={title} />
      <Stack.Screen name="change-theme" options={{ title: 'Theme', headerRight: () => null }} />
    </Stack>
  )
}
