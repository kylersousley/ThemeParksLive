import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
    favorited: boolean;
    onPress: () => void;
    size?: number;
};

/*
Both HIG and Material Design say button hitboxes must be a minimum of 44/48px. My star buttons (what used to be the arrow button to select a park, now that favorite button and can tap anywhere on the list item to select the park) originally had a 26px hit box, but I added padding 4 to the style of the favorite button and put hitSlop={7} in the pressable to make the hitbox 48px.
*/
export default function FavoriteButton({ favorited, onPress, size = 26 }: Props) {
    const { colors } = useTheme()
    return (
        <Pressable onPress={onPress} hitSlop={7} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Ionicons name={favorited ? "star" : "star-outline"} size={size} color={colors.primary} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 4
    },
    pressed: {
        transform: [{ scale: 0.85 }]
    }
})