import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import Photo from './Photo';
import { useTheme } from '@/contexts/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    name: string;
    image?: string | null;
    onPress: () => void;
};

export default function PickerRow({name, image, onPress}: Props) {
    const { colors } = useTheme()

    const handlePress = () => {
        Haptics.selectionAsync()
        onPress()
    };

    return (
        <Pressable onPress={handlePress}>
            <View style={[styles.rowContainer, { backgroundColor: colors.surfaceContainer }]}>
                {image !== undefined && <Photo image={image} />}
                <View style={styles.labelContainer}>
                    <Text style={[styles.text, { color: colors.onSurface }]}>{name}</Text>
                </View>
                <Ionicons name="chevron-forward" size={26} color={colors.onSurfaceVariant} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 12,
    },
    labelContainer: {
        flex: 1,
        paddingRight: 12,
    },
    text: {
        fontSize: 16,
    },
});
