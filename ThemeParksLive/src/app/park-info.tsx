import { View, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from 'expo-router';

import Ride from "@/components/Ride"
import ParkTitle from "@/components/ParkTitle"
import EmptyState from "@/components/EmptyState"
import { getRidesByParkId, RideData } from "@/api/rides";
import { useTheme } from '@/contexts/ThemeContext';
import { getParkById, ParkData } from "@/api/parks";
import { useEffect, useState } from "react";

export default function Index() {
  const { colors } = useTheme()
  const { id } = useLocalSearchParams<{ id: string }>();
  const [park, setPark] = useState<ParkData>()
  const [parkRides, setParkRides] = useState<RideData[]>([])

  useEffect(() => {
    getParkById(id).then(setPark)
    getRidesByParkId(id).then(setParkRides)
  }, [id])

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
        />
      </View>
    );
  } else {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <EmptyState icon="construct-sharp" title="Under construction" message="Pardon my dust, this page is currently under construction!" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});