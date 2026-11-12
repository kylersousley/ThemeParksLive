import { View, StyleSheet, FlatList, TextInput } from "react-native";
import { useCallback, useEffect, useState } from "react";

import Park from "@/components/Park"
import { getFavorites, toggleFavorite } from '@/storage/favoriteStorage';
import { useFocusEffect } from "expo-router";
import { getAllParks, ParkData } from "@/api/parks";
import { getParkPhotos, ParkPhoto } from "@/storage/photoStorage";
import { useTheme } from "@/contexts/ThemeContext";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";

export default function Index() {
  const { colors } = useTheme()
  const [allParks, setAllParks] = useState<ParkData[]>([])
  const [parkPhotos, setParkPhotos] = useState<ParkPhoto[]>([])
  const [inputText, onChangeText] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
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

  const parkList = allParks.filter(park => park.name.toLowerCase().replace(/\s+/g, '').includes(inputText.toLowerCase().replace(/\s+/g, '')))

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.inputContainer}>
        <TextInput style={[styles.input, { backgroundColor: colors.surfaceContainerHigh, color: colors.onSurface }]} onChangeText={onChangeText} value={inputText} placeholder="Search" placeholderTextColor={colors.onSurfaceVariant} autoCorrect={false} returnKeyType="search" />
      </View>
      { loading ? (
        <LoadingState />
      ) : error ? (
        <EmptyState icon="alert-circle-outline" title="Couldn't load parks" message={error} />
      ) : (
        <FlatList
          data={parkList}
          keyExtractor={(park) => park.id}
          renderItem={({ item }) => (
            <Park parkId={item.id} parkName={item.name} image={parkPhotos.find((photo) => photo.id === item.id)?.uri ?? null} favorited={favorites.includes(item.id)} onToggleFavorite={() => onToggleFavorite(item.id)}/>
          )}
          ListEmptyComponent={
            <EmptyState icon="search-outline" title="No parks found" message="Try a different name or check your spelling" />
          }
        />        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 16,
  },
  inputContainer: {
  }
});
