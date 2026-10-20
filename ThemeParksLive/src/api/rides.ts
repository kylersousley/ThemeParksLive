export type RideData = {
    id: string;
    name: string;
    status: string;
    queue: {
        STANDBY?: { waitTime?: number | null };
    };
};

// To Do one I implement the API
export async function getRidesByParkId(id: string) {}