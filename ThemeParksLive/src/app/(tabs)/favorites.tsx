import { Text, View, StyleSheet, FlatList, SafeAreaView, TextInput } from "react-native";
import { useRouter, router, useFocusEffect } from 'expo-router';
import {useCallback, useEffect, useState} from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

import Park from "@/components/Park"
import IconButton from "@/components/IconButton"
import { getFavorites, toggleFavorite } from "@/storage/favoriteStorage";
import { getAllParks, ParkData } from "@/api/parks";
import EmptyState from "@/components/EmptyState";

export default function Favorites() {
  const [allParks, setAllParks] = useState<ParkData[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    getAllParks().then(setAllParks)
  }, [])

  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setFavorites)
    }, [])
  );

  const onToggleFavorite = (id: string) => {
    toggleFavorite(id).then(setFavorites)
  }

  const favoriteParks = allParks.filter((park) => favorites.includes(park.id))

  return (
    <View style={styles.container}>
      <FlatList 
        data={favoriteParks}
        keyExtractor={(park) => park.id}
        ListEmptyComponent={
          <EmptyState icon="star" title="You have no favorites yet!" message="Tap the star on any park to favorite it." />
        }
        renderItem={({ item }) => (
          <Park parkName={item.name} favorited onToggleFavorite={() => onToggleFavorite(item.id)} />
        )}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F6F2",
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
  }
});
