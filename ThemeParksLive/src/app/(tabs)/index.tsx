import { View, StyleSheet, FlatList, TextInput } from "react-native";
import { useCallback, useEffect, useState } from "react";

import Park from "@/components/Park"
import { getFavorites, toggleFavorite } from '@/storage/favoriteStorage';
import { useFocusEffect } from "expo-router";
import { getAllParks, ParkData } from "@/api/parks";
import { getParkPhotos, ParkPhoto } from "@/storage/photoStorage";
import { useTheme } from "@/contexts/ThemeContext";

export default function Index() {
  const { colors } = useTheme()
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
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.inputContainer}>
        <TextInput style={[styles.input, { backgroundColor: colors.surfaceContainerHigh, color: colors.onSurface }]} onChangeText={onChangeText} value={inputText} placeholder="Search" placeholderTextColor={colors.onSurfaceVariant} autoCorrect={false} returnKeyType="search" />
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
