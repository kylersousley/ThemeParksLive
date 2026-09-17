import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#A5C9CA',
                tabBarInactiveTintColor: '#E7F6F2',
                headerStyle: {
                    backgroundColor: '#2C3333',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#2C3333',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Theme Parks Live',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    )
                }} 
            />
            <Tabs.Screen
                name="favorites"
                options={{ 
                    title: 'Favorites',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'star-sharp' : 'star-outline'} color={color} size={24} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="top-10"
                options={{
                    title: 'My Top 10',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'list-sharp' : 'list-outline'} color={color} size={24} />
                    )
                }}
            />
        </Tabs>
    );
}