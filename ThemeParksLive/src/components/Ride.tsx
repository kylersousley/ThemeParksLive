import { StyleSheet, View, Text } from 'react-native';

type Props = {
    rideName: string;
    waitTime?: number | null;
    status: string;
};

export default function Ride({rideName, waitTime, status}: Props) {

    return (
        <View style={styles.rideContainer}>
            <View style={styles.labelContainer}>
                <Text style={styles.nameText}>{rideName}</Text>
                <Text style={[styles.statusText, status === "CLOSED" && styles.statusTextClosed]}>{status}</Text>
            </View>
            <View style={styles.waitTimeContainer}>
                <Text>{waitTime}</Text>
                {waitTime != null && <Text>minutes</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rideContainer: {
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
        gap: 15,
    },
    waitTimeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameText: {
        fontSize: 20,
        color: '#395B64',
    },
    statusText: {
        fontSize: 14,
        color: '#115901',
    },
    statusTextClosed: {
        fontSize: 14,
        color: '#850101',
    }
});