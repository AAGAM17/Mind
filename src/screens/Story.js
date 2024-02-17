import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

const Story = () => {
  const navigation = useNavigation();
    const redirectToMusic = () => {
      navigation.navigate('Music');
    };
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Therapy Session</Text>
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Cotact Doctors</Text>
        <AntDesign name="arrowright" size={24} color="black" position="absolute" right={12} top={20}/>
        
      </View>
      <View style={styles.cardS}>
        <Text style={styles.howAreYouText}>{`Online therapy sessions with licenced professionals, one to one interactions with doctors or therapists.`} </Text>
      </View>
      <View style={styles.card} onPress={redirectToMusic()}>
        <Text style={styles.welcomeText}>Listen Music</Text>
        <AntDesign name="arrowright" size={24} color="black" position="absolute" right={12} top={20}/>
      </View>
      <View style={styles.cardS}>
        <Text style={styles.howAreYouText}>{`Curated playlist for relaxation and different preferences.`} </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Podcasts</Text>
        <AntDesign name="arrowright" size={24} color="black" position="absolute" right={12} top={20}/>
      </View>
      <View style={styles.cardS}>
        <Text style={styles.howAreYouText}>{`Listen to podcasts to boost metal health, reduce stress and improve your active listening skills.`} </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Story</Text>
        <AntDesign name="arrowright" size={24} color="black" position="absolute" right={12} top={20}/>
      </View>
      <View style={styles.cardS}>
        <Text style={styles.howAreYouText}>{`Listen to engaging story to boost metal health, reduce stress and improve your active listening skills.`} </Text>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#A1E9F0',
    borderRadius: 20,
    padding: 20,
    marginBottom: 2,
    marginTop: 10,
    width: 395,
    height: 65,
    justifyContent: 'space-between',
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  cardS: {
    backgroundColor: '#E8F9ED',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    marginTop: 8,
    width: 393,
    height: 86,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
    alignContent: 'left',
    marginLeft: 6,
  },
  howAreYouText: {
    fontSize: 13,
    marginLeft: 6,
    fontFamily: 'Kumbh-Sans',
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 15,
    marginLeft: 20,
  },
  sub: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Kumbh-Sans',
  },
});

export default Story;

