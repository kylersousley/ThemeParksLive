import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useRouter, router } from 'expo-router';

import Park from "@/components/Park"
import IconButton from "@/components/IconButton"
import { parkBank } from "@/park-bank"

export default function Index() {
  const allParks = parkBank.destinations.flatMap((destination) => destination.parks);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allParks}
        keyExtractor={(park) => park.id}
        renderItem={({ item }) => (
          <Park parkName={item.name} />
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
