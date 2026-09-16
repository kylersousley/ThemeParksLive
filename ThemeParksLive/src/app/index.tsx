import { Text, Button, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import {useState} from "react";
import { useRouter, router } from 'expo-router';

import Park from "@/components/Park"
import IconButton from "@/components/IconButton"
import { parkBank } from "@/park-bank"

export default function Index() {
  const allParks = parkBank.destinations.flatMap((destination) => destination.parks);

  const initialList = [
    {name:'Brayden', id: 1},
    {name:'Kyler', id: 2},
    {name:'James', id: 3},
    {name:'Kyler2', id: 4},
  ]

  const [myList, setMyList] = useState(initialList)

  const filterStuff = () => {
    console.log('filterStuff')

    let newList = myList.slice(0,2)
    setMyList(newList)
    
  }
  return (
    <SafeAreaView style={styles.container}>
      <Button title="filter" onPress={filterStuff}/>

    <FlatList data={myList} renderItem={({item}) => (
      <Text>{item.name}</Text>
    )}/>
      {/* <FlatList
        data={allParks}
        keyExtractor={(park) => park.id}
        renderItem={({ item }) => (
          <Park parkName={item.name} />
        )}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F6F2",
  },
});
