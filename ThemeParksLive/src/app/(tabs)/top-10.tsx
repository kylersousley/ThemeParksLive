import { View, StyleSheet } from "react-native";

import EmptyState from "@/components/EmptyState";
import { useTheme } from '@/contexts/ThemeContext';

export default function Index() {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <EmptyState icon="construct-sharp" title="Under construction" message="Pardon my dust, this page is currently under construction!" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
