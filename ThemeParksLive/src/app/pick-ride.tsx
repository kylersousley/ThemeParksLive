import { View, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';

import ParkTitle from "@/components/ParkTitle"
import EmptyState from "@/components/EmptyState"
import { getRidesByParkId, RideData } from "@/api/rides";
import { useTheme } from '@/contexts/ThemeContext';
import { getParkById, ParkData } from "@/api/parks";
import { useEffect, useState } from "react";
import LoadingState from "@/components/LoadingState";
import PickerRow from "@/components/PickerRow";
import { setSlotRide, TopRide } from "@/storage/topTenStorage";

export default function PickRide() {
  const { colors } = useTheme()
  const [park, setPark] = useState<ParkData>()
  const [parkRides, setParkRides] = useState<RideData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { slotId, parkId } = useLocalSearchParams<{ slotId: string, parkId: string }>()
  const router = useRouter()

  useEffect(() => {
    Promise.all([ getParkById(parkId), getRidesByParkId(parkId) ])
      .then(([ parkResult, rides ]) => {
        setPark(parkResult)
        setParkRides(rides)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [parkId])

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <LoadingState />
      </View>
    );
  }

  if (error) {
    return(
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <EmptyState icon="alert-circle-outline" title="Couldn't load rides" message={error} />
      </View>      
    )
  }

  if (!park) {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <EmptyState icon="help" title="Not found" message={`Park could not be found`} />
      </View>      
    )
  }

  if (park) {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <ParkTitle parkID={park.id} parkName={park.name} photo={false} />
        <FlatList
          data={parkRides}
          contentInsetAdjustmentBehavior="automatic"
          keyExtractor={(ride) => ride.id}
          renderItem={({ item }) => (
            <PickerRow name={item.name} onPress={() => setSlotRide(slotId, { id: item.id, name: item.name }).then(() => router.dismissTo("/top-10"))} />
          )}
          ListEmptyComponent={
            <EmptyState icon="time-outline" title="No ride data available" message="Live wait times aren't available for this park yet." />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});