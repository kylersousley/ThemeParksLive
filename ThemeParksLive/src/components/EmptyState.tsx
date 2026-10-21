import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    message: string;
};

export default function EmptyState({ icon, title, message}: Props) {

    return (
        <View style={styles.container}>
            <View style={styles.iconCircle}>
                <Ionicons name={icon} size={40} color="black" />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: 80,
        gap: 12,
    },
    iconCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 21,
    },
});
