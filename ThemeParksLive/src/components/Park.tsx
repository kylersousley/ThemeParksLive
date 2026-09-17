import { StyleSheet, View, Text } from 'react-native';
import IconButton from "@/components/IconButton";
import { useRouter, router } from 'expo-router';
import * as Haptics from 'expo-haptics';

type Props = {
    parkName: String;
    parkCompany: String; 
};

export default function Park({parkName, parkCompany}: Props) {
    const router = useRouter();
    const sendData = () => {
    Haptics.selectionAsync()
    router.push({
      pathname: '/park-info',
      params: { park: parkName }
    });
    };
    return (
        <View style={styles.parkContainer}>
            <View style={styles.labelContainer}>
                <Text style={styles.text}>{parkName}</Text>
            </View>
            <View style={styles.iconButtonContainer}>
                <IconButton icon="chevron-forward" onPress={sendData} />
            </View>
        </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#395B64',
    },
});