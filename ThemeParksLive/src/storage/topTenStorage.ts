import AsyncStorage from "@react-native-async-storage/async-storage";

const TOP_TEN_KEY = "topTen"

export interface TopRide {
    id: string;
    name: string;
}

export interface Slot {
    id: string;
    ride: TopRide | null;
}

const DEFAULT_TOP_TEN: Slot[] = Array(10).fill(null).map((_, i) => ( {id: `slot-${i+1}`, ride: null} ))

export async function getTopTen(): Promise<Slot[]> {
    const json = await AsyncStorage.getItem(TOP_TEN_KEY);
    return json ? JSON.parse(json) : DEFAULT_TOP_TEN;
}

export async function saveTopTen(slots: Slot[]) {
    await AsyncStorage.setItem(TOP_TEN_KEY, JSON.stringify(slots))
}