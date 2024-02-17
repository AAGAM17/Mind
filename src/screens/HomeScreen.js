import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesome, Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Kumbh-Sans': require("../../assets/fonts/KumbhSans-VariableFont_YOPQ.ttf"),
  });
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      if (data && data.length > 0) {
        setQuote(data[0].q);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.howAreYouText}>How Are You Today?</Text>
      <View style={styles.card}>
        <Text style={styles.sub}>"{quote}"</Text>
        <Button
          title="Start Assessment"
          onPress={() => navigation.navigate('Assessment')}
        />
      </View>
      <Text style={styles.title}>Explore</Text>
      <View style={styles.tileContainer}>
        <View style={styles.tileRow}>
          <View style={styles.tile} >
          <MaterialCommunityIcons name="yoga" size={55} color="black" />
          <Button
          title="View Activities"
          onPress={() => navigation.navigate('Story')}
          fontFamily="Kumbh-Sans"
        />
          </View>
          <View style={styles.tile}>
          <Entypo name="game-controller" size={55} color="black" />
          <Button
        title="Play Game"
        onPress={() => navigation.navigate('Game')}
      />
          </View>
        </View>
       </View>
        <Text style={styles.title}>Join Communities</Text>
      <View style={styles.tileContainer}>
        <View style={styles.tileRow}>
          <View style={styles.tile} >
      <FontAwesome name="group" size={55} color="black" onPress={()=> navigation.navigate('Community')}/>
          <Button
             title="View Community"
             onPress={() => navigation.navigate('Community')}
          />
          </View>
          <View style={styles.tile} >
          <Ionicons name="chatbox-ellipses-sharp" size={55} color="black" onPress={()=> navigation.navigate('Mindful')}/>
          <Button
          title="Chat Bot"
          onPress={() => navigation.navigate('Mindful')}
        />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#A1E9F0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: 12,
    width: 395,
    height: 183,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    alignContent: 'left',
    marginLeft: 20,
  },
  howAreYouText: {
    fontSize: 18,
    marginLeft: 20,
  },
  tileContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tileRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    width: 120,
    height: 135,
    backgroundColor: '#fff',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20,
  },
  sub: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Kumbh-Sans',
    alignItems: 'center',
    justifyContent: 'center',                                               
    alignSelf: 'center',
  },
});

export default HomeScreen;