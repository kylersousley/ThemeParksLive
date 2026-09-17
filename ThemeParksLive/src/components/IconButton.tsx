import { View, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
};

export default function IconButton({icon, onPress}: Props) {

    return (
        <View style={styles.iconButtonContainer}>
            <Pressable onPress={onPress}>
                <Ionicons name={icon} size={26} color={"#395B64"} />
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