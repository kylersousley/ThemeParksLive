import { Text, View, StyleSheet, FlatList, SafeAreaView, TextInput } from "react-native";
import { useState } from "react";

import Park from "@/components/Park"
import { parkBank } from "@/park-bank"

export default function Index() {
  const allParks = parkBank.destinations.flatMap((destination) => destination.parks);
  const [parkList, setParkList] = useState(allParks)
  const [inputText, onChangeText] = useState('')

  const filterParks = (text: string) => {
    onChangeText(text)
    let filteredParks = allParks.filter(park => park.name.toLowerCase().replace(/\s+/g, '').includes(text.toLowerCase().replace(/\s+/g, '')))
    setParkList(filteredParks)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={filterParks} value={inputText} placeholder="Search" placeholderTextColor="gray" autoCorrect={false} returnKeyType="search" />
      </View>
      <FlatList
        data={parkList}
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
  input: {
    margin: 8,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#E7F6F2",
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  inputContainer: {
    borderWidth: 1,
    backgroundColor: "#395B64"
  }
});
