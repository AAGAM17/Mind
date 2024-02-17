import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios'; // Import Axios for making HTTP requests

const Music = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [mood, setMood] = useState('neutral'); // Default mood is set to neutral

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const playSound = async (track) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.uri },
      { shouldPlay: true }
    );
    setSound(newSound);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const suggestMusic = async () => {
    try {
      if (!currentTrack) {
        console.log('No current track available.');
        return;
      }
  
      let recommendedTrack = {
        name: 'Motivating Track', // Provide a motivating track name
        url: 'https://musicmind.s3.us-east-2.amazonaws.com/Grateful(PaglaSongs).mp3' // Provide a URL for the motivating track
      };;
  
      // Fetch music suggestions from Last.fm API
      const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
        params: {
          method: 'track.getSimilar',
          artist: currentTrack.artist, // Use current track's artist for suggestions
          track: currentTrack.name, // Use current track's name for suggestions
          api_key: '2648b75927215036464efd5ce81dae0f', // Replace 'your_api_key' with your Last.fm API key
          format: 'json'
        }
      });
  
      // Extract recommended track from response
      const similarTracks = response.data.similartracks.track;
  
      if (similarTracks.length > 0) {
        recommendedTrack = similarTracks[0];
      } else {
        console.log('No music suggestions available from Last.fm.');
        recommendedTrack = {
          name: 'Motivating Track', // Provide a motivating track name
          url: 'https://musicmind.s3.us-east-2.amazonaws.com/Grateful%28PaglaSongs%29.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEAl8AvFKt7tU00icZmfMi5WR15vYT920CASwxZoDbo3%2FcCIQCPngX3iR%2BueKnNwyU%2FrGWRbRC8agN4dBNyZDduRFz8wCrtAgjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAIaDDE2MzM3OTM1ODk5NSIM2XJi0zVkjZ3evnw%2BKsECEDMoRos2NcVD7nCYl%2FF3UeUoV4TfGQAUl%2BX0YnRegIQ%2BBi8b18jAJiSAyObUKAO3%2BdQCrll6E%2BjxjWUFC2BG3SyeItwvmSgcm3L%2F%2FE%2Bu0W2gifuZZ96lZYO0UpwUfvW1MKCsPGLHg8jPweQxNV7tHf4zsAjmyMf4U2ls%2FFg%2BPEs%2BHAAt6RtW8b5Acm70L%2B%2FJALdoA%2Btbp2FMjavKXNj3n86XBb9HuLr80xmP7vRf%2BZFNxrq6krKJ2Qrwab4rjIQsGrywFS3%2BQGvO%2BWCoDS%2FFeqqQgsyWPf1UC4OOAe0J0CBsRTiNlnY04jx1nINK8M0M2W4HaW5hp9Nmx7BkIon6V5Q%2BCy9wjsuUCydSBTTXizcfWGYvAKskzTSr7ol%2BBCWTg2W3QoCxbO941Qf8p13DyWmDAFwHioTH9M%2FzS3PKWc33MI2bwa4GOrICOhxCho8lwf6alpG%2FuPncD7iddjvkBGCeJq2VBTdMDAxe1KVZ3teWi2%2BqGzw44C%2FY8q4JSvACqhqdl4CmCM3EFcL4EZKiMSnosWg8f9sxhJII1dTSv%2B3aoa3Uhiyn1INxM0qGynlV1jXWvBif5HDzQfXdzrxtikPhH%2BFbWlCg66Gmjf78qTMTViUjWDTQZiu3D1y6AVrOjIcRDzkDTUVgLqUoaeRi%2Bt174Ds%2BS7%2BGwQ3edI76fCFqzNQX7yOiPIMpZBEDqwXkCcyydFxl%2Bp7KMUff6nMCEVzBnTTztzLhtNhsK8D9T3gKmFJLCJsKtzZfFnCJw4e05H2jePgulO3J9W1whurxnxtqtTzdkA695nERDFuK3CTHuWSKo64sq9sidzMnFX%2BSlT9QCNmiCeAKpp5L&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240217T061520Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIASMCRLFUJ2BNNAUV2%2F20240217%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=0b334d7a2724b077a7fbcb014414c7d531fd0705792862f2545b651f665b277f' // Provide a URL for the motivating track
        };
      }
  
      playSound({
        uri: recommendedTrack.url, 
        name: recommendedTrack.name 
      });
    } catch (error) {
      console.error('Error fetching music suggestions:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Player</Text>
      <View style={styles.controls}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            !isPlaying ? playSound() : suggestMusic();
          }}
        />
        <Button
          title="Stop"
          onPress={() => {
            stopSound();
          }}
        />
        <Button
          title="Suggest Music"
          onPress={() => {
            suggestMusic();
          }}
          disabled={!currentTrack} // Disable the button when there is no current track
        />
      </View>
      {currentTrack && (
        <Text style={styles.currentTrack}>{currentTrack.name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  currentTrack: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default Music;
