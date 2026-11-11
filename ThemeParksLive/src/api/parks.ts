export type ParkData = {
    id: string;
    name: string;
}

type DestinationData = {
    id: string;
    name: string;
    parks: ParkData[];
}

const BASE_URL = "https://api.themeparks.wiki/v1"

export async function getAllParks(): Promise<ParkData[]> {
    const response = await fetch(`${BASE_URL}/destinations`)
    if (!response.ok) {
        throw new Error(`Failed to load parks: ${response.status}`)
    }
    const data: { destinations: DestinationData[] } = await response.json()
    return data.destinations.flatMap((destination) => destination.parks)
}

export async function getParkById(id: string) {
    const parks = await getAllParks()
    return parks.find((park) => park.id === id)
}