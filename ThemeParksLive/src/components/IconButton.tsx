import { View, Pressable, StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    icon: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
};

export default function IconButton({icon, onPress}: Props) {

    return (
        <View style={styles.iconButtonContainer}>
            <Pressable onPress={onPress}>
                <MaterialIcons name={icon} size={24} color={"#395B64"} />
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