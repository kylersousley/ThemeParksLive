import { StyleSheet, View, Text } from 'react-native';

type Props = {
    parkName: String;
};


export default function ParkTitle({ parkName }: Props) {

    return (
        <View style={styles.parkTitleContainer}>
            <Text style={styles.text}>{parkName} Rides and Attractions</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    parkTitleContainer: {
        backgroundColor: "#395B64",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor: '#395B64',
        borderStyle: 'solid',
        width: '100%',
        padding: 40,
        paddingLeft: 10,
    },
    text: {
        fontSize: 22,
        color: '#E7F6F2'
    }
})