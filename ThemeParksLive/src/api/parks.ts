import { parkBank } from "@/park-bank";

export type ParkData = {
    id: string;
    name: string;
}

// Once I implement the API, these functions will call the api instead of using parkBank

export async function getAllParks() {
    return parkBank.destinations.flatMap((destination) => destination.parks)
}

export async function getParkById(id: string) {
    return parkBank.destinations.flatMap((destination) => destination.parks).find((park) => park.id === id)
}