import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Game = () => {
  const navigation = useNavigation();

  const handleGameSelection = (gameId) => {
    if (gameId === 1) {
      navigation.navigate('Gameone');
    } else if (gameId === 2) {
      navigation.navigate('Gametwo');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tile} onPress={() => handleGameSelection(1)}>
        <Text style={styles.tileText}>Color Gusser</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tile} onPress={() => handleGameSelection(2)}>
        <Text style={styles.tileText}>Sand Doodling</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    width: 200,
    height: 100,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  tileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Game;
