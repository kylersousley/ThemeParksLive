import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform, DynamicColorIOS } from 'react-native';

const isAndroid = Platform.OS === 'android';

const selectedColor = Platform.OS === 'ios'
    ? DynamicColorIOS({ light: '#395B64', dark: '#A5C9CA' })
    : '#E7F6F2';
const unselectedColor = '#7A8F90';

export default function TabLayout() {
    return (
        <NativeTabs
            backgroundColor={isAndroid ? '#2C3333' : undefined}
            tintColor={selectedColor}
            iconColor={isAndroid ? { default: unselectedColor, selected: selectedColor } : undefined}
            labelStyle={isAndroid
                ? { default: { color: unselectedColor }, selected: { color: selectedColor } }
                : undefined}
            indicatorColor="#395B64"
        >
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="favorites">
                <NativeTabs.Trigger.Label>Favorites</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf={{ default: 'star', selected: 'star.fill' }} md="star" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="top-10">
                <NativeTabs.Trigger.Label>My Top 10</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="list.bullet" md="list" />
            </NativeTabs.Trigger>
        </NativeTabs>



        // <Tabs
        //     screenOptions={{
        //         tabBarActiveTintColor: '#A5C9CA',
        //         tabBarInactiveTintColor: '#E7F6F2',
        //         headerStyle: {
        //             backgroundColor: '#2C3333',
        //         },
        //         headerShadowVisible: false,
        //         headerTintColor: '#fff',
        //         tabBarStyle: {
        //             backgroundColor: '#2C3333',
        //         },
        //     }}
        // >
        //     <Tabs.Screen
        //         name="index"
        //         options={{
        //             title: 'Theme Parks Live',
        //             tabBarLabel: 'Home',
        //             tabBarIcon: ({ color, focused }) => (
        //                 <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        //             )
        //         }} 
        //     />
        //     <Tabs.Screen
        //         name="favorites"
        //         options={{ 
        //             title: 'Favorites',
        //             tabBarIcon: ({ color, focused }) => (
        //                 <Ionicons name={focused ? 'star-sharp' : 'star-outline'} color={color} size={24} />
        //             )
        //         }} 
        //     />
        //     <Tabs.Screen 
        //         name="top-10"
        //         options={{
        //             title: 'My Top 10',
        //             tabBarIcon: ({ color, focused }) => (
        //                 <Ionicons name={focused ? 'list-sharp' : 'list-outline'} color={color} size={24} />
        //             )
        //         }}
        //     />
        // </Tabs>
    );
}