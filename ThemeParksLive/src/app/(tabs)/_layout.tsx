import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform, DynamicColorIOS } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const isAndroid = Platform.OS === 'android';

export default function TabLayout() {
    const { colors } = useTheme()

    const selectedColor = Platform.OS === 'ios'
        ? DynamicColorIOS({ light: '#395B64', dark: '#A5C9CA' })
        : colors.onSecondaryContainer;
    const unselectedColor = colors.onSurfaceVariant;

    return (
        <NativeTabs
            backgroundColor={isAndroid ? colors.surfaceContainer : undefined}
            tintColor={selectedColor}
            iconColor={isAndroid ? { default: unselectedColor, selected: selectedColor } : undefined}
            labelStyle={isAndroid
                ? { default: { color: unselectedColor }, selected: { color: selectedColor } }
                : undefined}
            indicatorColor={colors.secondaryContainer}
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
    );
}