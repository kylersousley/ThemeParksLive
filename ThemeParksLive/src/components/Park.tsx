import { StyleSheet, View, Text, Pressable } from 'react-native';
import FavoriteButton from './FavoritedButton';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Photo from './Photo';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
    parkId: string;
    parkName: string;
    favorited: boolean;
    image: string | null;
    onToggleFavorite: () => void;
};

export default function Park({parkId, parkName, favorited, image, onToggleFavorite}: Props) {
    const { colors } = useTheme()

    const router = useRouter();
    const sendData = () => {
    Haptics.selectionAsync()
    router.push({
      pathname: '/park-info',
      params: { id: parkId }
    });
    };

    return (
        <Pressable onPress={sendData}>
            <View style={[styles.parkContainer, { backgroundColor: colors.surfaceContainer }]}>
                <Photo image={image} />
                <View style={styles.labelContainer}>
                    <Text style={[styles.text, { color: colors.onSurface }]}>{parkName}</Text>
                </View>
                <View style={styles.iconButtonContainer}>
                    <FavoriteButton favorited={favorited} onPress={onToggleFavorite} />
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    parkContainer: {
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
    iconButtonContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
});