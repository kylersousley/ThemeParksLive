import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import Ride from "@/components/Ride"
import ParkTitle from "@/components/ParkTitle"
import { parkBank, seaWorldOrlandoRides, cedarPointRides } from "@/park-bank"

export default function Index() {
  const allParks = parkBank.destinations.flatMap((destination) => destination.parks);
  const { park } = useLocalSearchParams();
  let chosenPark = null
  if (park === "SeaWorld Orlando") {
    chosenPark = seaWorldOrlandoRides
  }

  if (park === "Cedar Point") {
    chosenPark = cedarPointRides
  }

  if (chosenPark) {
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
  } else {
    return (
      <SafeAreaView style={styles.constructionContainer}>
        <Ionicons name={"construct-sharp"} color={"#395B64"} size={72} />
        <Text style={styles.text}>Pardon my dust, this page is currently under consdtruction!</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F6F2",
  },
  constructionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E7F6F2",
    gap: 50,
  },
  text: {
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
  }
});