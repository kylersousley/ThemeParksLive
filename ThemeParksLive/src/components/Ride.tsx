import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
    rideName: string;
    waitTime?: number | null;
    status: string;
};

export default function Ride({rideName, waitTime, status}: Props) {
    const { colors } = useTheme()

    return (
        <View style={[styles.rideContainer, { backgroundColor: colors.surfaceContainer }]}>
            <View style={styles.labelContainer}>
                <Text style={[styles.nameText, { color: colors.onSurface }]}>{rideName}</Text>
                <Text style={[styles.statusText, status === "CLOSED" && [styles.statusTextClosed, { color: colors.error }]]}>{status}</Text>
            </View>
            <View style={styles.waitTimeContainer}>
                <Text style={{ color: colors.secondary }}>{waitTime}</Text>
                {waitTime != null && <Text style={{ color: colors.secondary }}>minutes</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        marginVertical: 16,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
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
    },
    statusText: {
        fontSize: 14,
        color: '#B2FFAB',
    },
    statusTextClosed: {
        fontSize: 14,
    }
});