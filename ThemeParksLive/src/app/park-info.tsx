import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useLocalSearchParams } from 'expo-router';

import Park from "@/components/Park"
import Ride from "@/components/Ride"
import IconButton from "@/components/IconButton"
import ParkTitle from "@/components/ParkTitle"
import { parkBank, seaWorldOrlandoRides, cedarPointRides } from "@/park-bank"

export default function Index() {
  const allParks = parkBank.destinations.flatMap((destination) => destination.parks);
  const { park } = useLocalSearchParams();
  let chosenPark = []
  if (park === "SeaWorld Orlando") {
    chosenPark = seaWorldOrlandoRides
  }

  if (park === "Cedar Point") {
    chosenPark = cedarPointRides
  }

  return (
    <SafeAreaView style={styles.container}>
      <ParkTitle parkName={park} />
      <FlatList
        data={chosenPark}
        keyExtractor={(ride) => ride.id}
        renderItem={({ item }) => (
          <Ride rideName={item.name} status={item.status} waitTime={item.queue['STANDBY']['waitTime']} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F6F2",
  },
});