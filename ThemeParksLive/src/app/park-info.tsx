import { View, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from 'expo-router';

import Ride from "@/components/Ride"
import ParkTitle from "@/components/ParkTitle"
import EmptyState from "@/components/EmptyState"
import { getRidesByParkId, RideData } from "@/api/rides";
import { useTheme } from '@/contexts/ThemeContext';
import { getParkById, ParkData } from "@/api/parks";
import { useEffect, useState } from "react";
import LoadingState from "@/components/LoadingState";

export default function Index() {
  const { colors } = useTheme()
  const { id } = useLocalSearchParams<{ id: string }>();
  const [park, setPark] = useState<ParkData>()
  const [parkRides, setParkRides] = useState<RideData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([ getParkById(id), getRidesByParkId(id) ])
      .then(([ parkResult, rides ]) => {
        setPark(parkResult)
        setParkRides(rides)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

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
        <EmptyState icon="alert-circle-outline" title="Couldn't load park" message={error} />
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
        <ParkTitle parkID={park.id} parkName={park.name} />
        <FlatList
          data={parkRides}
          keyExtractor={(ride) => ride.id}
          renderItem={({ item }) => (
            <Ride rideName={item.name} status={item.status} waitTime={item.queue?.STANDBY?.waitTime} />
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