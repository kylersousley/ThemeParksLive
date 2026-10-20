import { View, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    onPress: () => void;
};

export default function IconButton({icon, color, onPress}: Props) {

    return (
        <View style={styles.iconButtonContainer}>
            <Pressable onPress={onPress}>
                <Ionicons name={icon} size={26} color={color} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    iconButtonContainer: {
        width: 'auto',
        height: 'auto',
    },
});