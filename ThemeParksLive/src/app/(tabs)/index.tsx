import { Text, View, StyleSheet, FlatList, SafeAreaView, TextInput } from "react-native";
import { useCallback, useEffect, useState } from "react";

import Park from "@/components/Park"
import { parkBank } from "@/park-bank"
import { getFavorites, saveFavorite, toggleFavorite } from '@/storage/favoriteStorage';
import { useFocusEffect } from "expo-router";
import { getAllParks, ParkData } from "@/api/parks";
import { getParkPhotos, ParkPhoto } from "@/storage/photoStorage";

export default function Index() {
  const [allParks, setAllParks] = useState<ParkData[]>([])
  const [parkPhotos, setParkPhotos] = useState<ParkPhoto[]>([])
  const [inputText, onChangeText] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    getAllParks().then(setAllParks)
  }, [])

  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setFavorites)
      getParkPhotos().then(setParkPhotos)
    }, [])
  );

  const onToggleFavorite = (id: string) => {
    toggleFavorite(id).then(setFavorites)
  }

  const parkList = allParks.filter(park => park.name.toLowerCase().replace(/\s+/g, '').includes(inputText.toLowerCase().replace(/\s+/g, '')))

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={onChangeText} value={inputText} placeholder="Search" placeholderTextColor="gray" autoCorrect={false} returnKeyType="search" />
      </View>
      <FlatList
        data={parkList}
        keyExtractor={(park) => park.id}
        renderItem={({ item }) => (
          <Park parkId={item.id} parkName={item.name} image={parkPhotos.find((photo) => photo.id === item.id)?.uri ?? null} favorited={favorites.includes(item.id)} onToggleFavorite={() => onToggleFavorite(item.id)}/>
        )}
      />
    </View>
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
