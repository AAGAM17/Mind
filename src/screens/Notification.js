import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Notification = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Community");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.text}>New notification! Click here to view</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
});

export default Notification;
