import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';

const COLORS = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const GameOne = () => {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    loadHighScore();
    startNewRound();
  }, []);

  useEffect(() => {
    saveHighScore();
  }, [highScore]);

  const loadHighScore = async () => {
    try {
      const storedHighScore = await AsyncStorage.getItem('highScore');
      if (storedHighScore !== null) {
        setHighScore(parseInt(storedHighScore));
      }
    } catch (error) {
      console.log('Error loading high score:', error);
    }
  };

  const saveHighScore = async () => {
    try {
      await AsyncStorage.setItem('highScore', highScore.toString());
    } catch (error) {
      console.log('Error saving high score:', error);
    }
  };

  const startNewRound = () => {
    const newTargetColor = getRandomColor();
    const newOptions = [];
    newOptions.push(newTargetColor);
    for (let i = 0; i < 3; i++) {
      let randomColor;
      do {
        randomColor = getRandomColor();
      } while (randomColor === newTargetColor || newOptions.includes(randomColor));
      newOptions.push(randomColor);
    }
    newOptions.sort(() => Math.random() - 0.5);
    setTargetColor(newTargetColor);
    setOptions(newOptions);
  };

  const handleOptionPress = (selectedColor) => {
    if (selectedColor === targetColor) {
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
      startNewRound();
    } else {
      alert('Incorrect! Give it a Try again.');
      setScore(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.targetColorText}>Match the color:</Text>
      <View style={[styles.colorBox, { backgroundColor: targetColor }]} />
      <View style={styles.optionsContainer}>
        {options.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorOption, { backgroundColor: color }]}
            onPress={() => handleOptionPress(color)}
          />
        ))}
      </View>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.highScoreText}>High Score: {highScore}</Text>
    </View>
  );
};

export default GameOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetColorText: {
    fontSize: 24,
    marginBottom: 20,
  },
  colorBox: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  colorOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  scoreText: {
    fontSize: 18,
    marginTop: 20,
  },
  highScoreText: {
    fontSize: 18,
    marginTop: 10,
  },
});