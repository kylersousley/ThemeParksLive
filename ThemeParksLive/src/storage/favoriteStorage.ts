import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = "favorites"

export async function getFavorites() {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
}

export async function saveFavorite(favorites: unknown[]) {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

export async function toggleFavorite(id: string): Promise<string[]> {
    const ids: string[] = await getFavorites();
    const newIds = ids.includes(id) ? ids.filter((favId) => favId !== id) : [...ids, id];
    await saveFavorite(newIds);
    return newIds;
}

export async function clearFavorites() {
    await saveFavorite([]);
}