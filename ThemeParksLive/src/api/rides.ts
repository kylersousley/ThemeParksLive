export type RideData = {
    id: string;
    name: string;
    entityType: string;
    parkId: string;
    status: string;
    queue?: {
        STANDBY?: { waitTime?: number | null };
    };
    lastUpdated: string;
};

const BASE_URL = "https://api.themeparks.wiki/v1"

export async function getRidesByParkId(id: string) {
    const response = await fetch(`${BASE_URL}/entity/${id}/live`)
    if (!response.ok) {
        throw new Error(`Failed to load live park data: ${response.status}`)
    }
    const data: { liveData: RideData[] } = await response.json()
    return data.liveData.filter((ride) => ride.entityType === "ATTRACTION")
}