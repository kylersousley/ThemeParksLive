import { View, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from 'expo-router';

import Ride from "@/components/Ride"
import ParkTitle from "@/components/ParkTitle"
import EmptyState from "@/components/EmptyState"
import { parkBank, seaWorldOrlandoRides, cedarPointRides } from "@/park-bank"
import { RideData } from "@/api/rides";
import { useTheme } from '@/contexts/ThemeContext';

export default function Index() {
  const { colors } = useTheme()
  const allParks = parkBank.destinations.flatMap((destination) => destination.parks);
  const { id } = useLocalSearchParams<{ id: string }>();
  const park = allParks.find((p) => p.id === id);
  let chosenPark: RideData[] | null = null
  if (park?.name === "SeaWorld Orlando") {
    chosenPark = seaWorldOrlandoRides
  }

  if (park?.name === "Cedar Point") {
    chosenPark = cedarPointRides
  }

  if (park && chosenPark) {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <ParkTitle parkID={park.id} parkName={park.name} />
        <FlatList
          data={chosenPark}
          keyExtractor={(ride) => ride.id}
          renderItem={({ item }) => (
            <Ride rideName={item.name} status={item.status} waitTime={item.queue.STANDBY?.waitTime} />
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