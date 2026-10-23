import { Pressable, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
    title: string;
    onPress: () => void;
};

export default function CustomButton({ title, onPress }: Props) {
    const { colors, themeName } = useTheme()
    const isCurrentTheme = themeName === title.toLowerCase()

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                isCurrentTheme
                    ? { backgroundColor: colors.primary }
                    : { borderWidth: 1, borderColor: colors.outline },
                pressed && styles.pressed
            ]}
        >
            {isCurrentTheme && <Ionicons name="checkmark" size={18} color={colors.onPrimary} />}
            <Text style={[styles.text, { color: isCurrentTheme ? colors.onPrimary : colors.primary }]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        minWidth: 200,
        height: 48,
        paddingHorizontal: 24,
        borderRadius: 16,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    pressed: {
        opacity: 0.8,
    },
});
