import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/contexts/ThemeContext';
import { useHeaderHeight } from 'expo-router/build/react-navigation/index.js';

export default function LoadingState() {
    const { colors } = useTheme()
    const headerHeight = useHeaderHeight()

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: -headerHeight }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
