import { Text, View, StyleSheet, FlatList, SafeAreaView, TextInput } from "react-native";
import { useRouter, router } from 'expo-router';
import {useState} from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

import Park from "@/components/Park"
import IconButton from "@/components/IconButton"

export default function Index() {

  return (
    <SafeAreaView style={styles.container}>
        <Ionicons name={"construct-sharp"} color={"#395B64"} size={72} />
        <Text style={styles.text}>Pardon my dust, this page is currently under consdtruction!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E7F6F2",
    gap: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
  }
});
