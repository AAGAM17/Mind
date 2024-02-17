import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, PanResponder, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const GameTwo = () => {
  const [path, setPath] = useState('');
  const { width, height } = Dimensions.get('window');

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const { locationX, locationY } = gestureState;
      const newPath = `${path} L${locationX},${locationY}`;
      setPath(newPath);
    },
    onPanResponderRelease: () => {}
  });

  return (
    <View style={styles.container}>
      <Svg style={styles.svg} width={width} height={height}>
        <Path d={path} fill="none" stroke="black" strokeWidth="3" {...panResponder.panHandlers} />
      </Svg>
      <TouchableOpacity style={styles.clearButton} onPress={() => setPath('')}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>Draw in the sand to create your Zen garden.</Text>
      </View>
    </View>
  );
};

export default GameTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    flex: 1,
    position: 'absolute',
  },
  clearButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  clearButtonText: {
    fontSize: 16,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
  },
  instructionsText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
