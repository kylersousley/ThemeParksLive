import { View, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    image: string | null;
    size?: number;
}

export default function Photo({ image, size = 64 }: Props) {
    const box = { width: size, height: size };

    return (
        <View>
            {image ? (
                <Image source={{ uri: image }} style={[styles.image, box]} contentFit="cover" />
            ) : (
                <View style={[styles.image, styles.imagePlaceholder, box]}>
                    <Ionicons name="image-outline" size={size * 0.4} color="#7A8F90" />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 8,
    },
    imagePlaceholder: {
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
