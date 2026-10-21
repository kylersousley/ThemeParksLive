import AsyncStorage from '@react-native-async-storage/async-storage';

const PHOTOS_KEY = "photos"

export type ParkPhoto = {
    id: string;
    uri: string | null;
}

export async function getParkPhotos(): Promise<ParkPhoto[]> {
    const json = await AsyncStorage.getItem(PHOTOS_KEY);
    return json ? JSON.parse(json) : [];
}

export async function getParkPhoto(id: string) {
  const parkPhotos = await getParkPhotos();
  return parkPhotos.find((park) => park.id === id) ?? null;
}

export async function saveParkPhotos(parkPhotos: ParkPhoto[]) {
    await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(parkPhotos))
}

export async function setParkPhoto(id: string, uri: string | null): Promise<void> {
    const photos: ParkPhoto[] = await getParkPhotos()
    const index = photos.findIndex((park) => park.id === id)
    if (index === -1) {
        photos.push({ id, uri })
    } else {
        photos[index] = { id, uri }
    }
    await saveParkPhotos(photos)
}