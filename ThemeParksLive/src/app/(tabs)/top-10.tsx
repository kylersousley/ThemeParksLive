import { useTheme } from '@/contexts/ThemeContext';
import React, {memo, useCallback, useState} from 'react';
import {ListRenderItemInfo, Pressable, StyleSheet, Text, View} from 'react-native';
import { TopRide, Slot, getTopTen, saveTopTen } from '@/storage/topTenStorage';

import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
  useReorderableDrag,
  useIsActive,
} from 'react-native-reorderable-list';
import { useFocusEffect } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


type CardProps = {
  id: string;
  ride: TopRide | null;
  rank: number;
}

const Card: React.FC<CardProps> = memo(({id, ride, rank}) => {
  const drag = useReorderableDrag();
  const { colors } = useTheme()
  const isActive = useIsActive();

  return (
    <Pressable
      style={[
        styles.card,
        isActive
          ? { backgroundColor: colors.primaryContainer }
          : { backgroundColor: colors.surfaceContainer }
      ]}
      onLongPress={drag}
    >
      <Text
        style={[
          styles.text,
          styles.rankText,
          isActive
            ? { color: colors.onPrimaryContainer }
            : { color: colors.primary }
        ]}
      >
        {`${rank}.`}
      </Text>
      <Text
        style={[
          styles.text,
          styles.nameText,
          isActive
            ? { color: colors.onPrimaryContainer }
            : ride 
            ? { color: colors.onSurface }
            : { color: colors.onSurfaceVariant }
        ]}
      >
        {ride ? ride.name : "Empty - tap edit to add a ride"}
      </Text>
      <Ionicons name="reorder-three-outline" size={26} color={colors.onSurfaceVariant} />
    </Pressable>
  );
});

const TopTen = () => {
  const [data, setData] = useState<Slot[]>([]);
  const { colors } = useTheme()

  useFocusEffect(
    useCallback(() => {
      getTopTen().then(setData)
    }, [])
  );

  const handleReorder = ({from, to}: ReorderableListReorderEvent) => {
    const reorderedList = reorderItems(data, from, to)
    setData(reorderedList)
    saveTopTen(reorderedList)
  };

  const renderItem = ({item, index}: ListRenderItemInfo<Slot>) => (
    <Card {...item} rank={index + 1} />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <ReorderableList
        data={data}
        onReorder={handleReorder}
        shouldUpdateActiveItem={true}
        renderItem={renderItem}
        // IMPORTANT: Do not use the current index as key.
        // Always use a stable and unique key for each item.
        keyExtractor={item => item.id}
        contentInsetAdjustmentBehavior='automatic'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 12,
  },
  text: {
    fontSize: 20,
  },
  rankText: {
    width: 36,
    textAlign: 'right',
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  nameText: {
    flex: 1,
  }
});

export default TopTen;