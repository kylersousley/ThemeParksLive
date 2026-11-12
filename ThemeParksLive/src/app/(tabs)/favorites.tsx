import { View, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from 'expo-router';
import {useCallback, useEffect, useState} from "react";

import Park from "@/components/Park"
import { getFavorites, toggleFavorite } from "@/storage/favoriteStorage";
import { getAllParks, ParkData } from "@/api/parks";
import EmptyState from "@/components/EmptyState";
import { getParkPhotos, ParkPhoto } from "@/storage/photoStorage";
import { useTheme } from '@/contexts/ThemeContext';
import LoadingState from "@/components/LoadingState";

export default function Favorites() {
  const { colors } = useTheme()
  const [allParks, setAllParks] = useState<ParkData[]>([])
  const [parkPhotos, setParkPhotos] = useState<ParkPhoto[]>([])
  const [favorites, setFavorites] = useState<string[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllParks()
      .then(setAllParks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
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

  const favoriteParks = allParks.filter((park) => (favorites ?? []).includes(park.id))

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      { loading || !favorites ? (
        <LoadingState />
      ) : error ? (
        <EmptyState icon="alert-circle-outline" title="Couldn't load favorites" message={error} />
      ) : (
        <FlatList 
          data={favoriteParks}
          keyExtractor={(park) => park.id}
          ListEmptyComponent={
            <EmptyState icon="star" title="You have no favorites yet!" message="Tap the star on any park to favorite it." />
          }
          renderItem={({ item }) => (
            <Park parkId={item.id} parkName={item.name} image={parkPhotos.find((photo) => photo.id === item.id)?.uri ?? null} favorited onToggleFavorite={() => onToggleFavorite(item.id)} />
          )}
        />
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
  }
});
