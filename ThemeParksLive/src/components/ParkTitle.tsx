import { StyleSheet, View, Text, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Photo from './Photo';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getParkPhoto, setParkPhoto } from '@/storage/photoStorage';

type Props = {
    parkID: string;
    parkName: string;
};


export default function ParkTitle({ parkID, parkName }: Props) {
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        getParkPhoto(parkID).then((photo) => setImage(photo?.uri ?? null))
    }, [parkID])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.7
        })
        if (!result.canceled) {
            const uri = result.assets[0].uri
            setImage(uri)
            await setParkPhoto(parkID, uri)
        }
    }


    return (
        <View style={styles.parkTitleContainer}>
            <View style={styles.photoContainer}>
                <Photo image={image} size={88} />
                <Pressable
                    onPress={pickImage}
                    hitSlop={6}
                    style={({ pressed }) => [styles.cameraButton, pressed && styles.pressed]}
                >
                    <Ionicons name="camera" size={16} color="#2C3333" />
                </Pressable>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.parkName}>{parkName}</Text>
                <Text style={styles.subtitle}>Rides and Attractions</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    parkTitleContainer: {
        flexDirection: 'row',
        gap: 16,
        backgroundColor: "#395B64",
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    photoContainer: {
        padding: 12,
        margin: -12,
    },
    textContainer: {
        flex: 1,
        gap: 4,
    },
    parkName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#E7F6F2'
    },
    subtitle: {
        fontSize: 15,
        color: '#A5C9CA'
    },
    cameraButton: {
        position: 'absolute',
        right: 6,
        bottom: 6,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E7F6F2',
        borderWidth: 2,
        borderColor: '#395B64',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressed: {
        transform: [{ scale: 0.9 }]
    }
})
