import { useTheme } from '@/contexts/ThemeContext';
import React, {memo, useState} from 'react';
import {ListRenderItemInfo, Pressable, StyleSheet, Text, View} from 'react-native';
import { TopRide } from '@/storage/topTenStorage';

import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
  useReorderableDrag,
  useIsActive,
} from 'react-native-reorderable-list';

type CardProps = {
  id: string;
  name: string;
  rank: number;
}

const seedData: TopRide[] = [
  { id: "r1", name: "Cannibal" },
  { id: "r2", name: "Wicked" },
  { id: "r3", name: "Primordial" },
  { id: "r4", name: "J3 Grand Prix" },
  { id: "r5", name: "Bombora" },  
]

const Card: React.FC<CardProps> = memo(({id, name, rank}) => {
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
          isActive
            ? { color: colors.onPrimaryContainer }
            : { color: colors.onSurface }
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
});

const TopTen = () => {
  const [data, setData] = useState(seedData);
  const { colors } = useTheme()

  const handleReorder = ({from, to}: ReorderableListReorderEvent) => {
    setData(value => reorderItems(value, from, to));
  };

  const renderItem = ({item, index}: ListRenderItemInfo<TopRide>) => (
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
});

export default TopTen;