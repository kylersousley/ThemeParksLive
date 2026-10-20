import { StyleSheet, View, Text, Pressable } from 'react-native';
import IconButton from "@/components/IconButton";
import FavoriteButton from './FavoritedButton';
import { useRouter, router } from 'expo-router';
import * as Haptics from 'expo-haptics';

type Props = {
    parkName: string;
    favorited: boolean;
    onToggleFavorite: () => void; 
};

export default function Park({parkName, favorited, onToggleFavorite}: Props) {



    const router = useRouter();
    const sendData = () => {
    Haptics.selectionAsync()
    router.push({
      pathname: '/park-info',
      params: { park: parkName }
    });
    };

    return (
        <Pressable onPress={sendData}>
            <View style={styles.parkContainer}>
                <View style={styles.labelContainer}>
                    <Text style={styles.text}>{parkName}</Text>
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
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#395B64',
        borderStyle: 'solid',
        width: '100%',
        padding: 40,
        paddingLeft: 10,
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
        color: '#395B64',
    },
});