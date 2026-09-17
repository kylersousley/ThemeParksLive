import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerBackButtonDisplayMode: 'minimal'}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/*<Stack.Screen name="index" options={{ title: 'Theme Parks Live', headerStyle: { backgroundColor: '#2C3333'}, headerTintColor: '#ffffff' }} />*/}
      <Stack.Screen name="park-info" options={{ title: 'Theme Parks Live', headerStyle: { backgroundColor: '#2C3333'}, headerTintColor: '#ffffff' }} />
    </Stack>
  )
}
