import React from 'react';
import { View, StyleSheet } from 'react-native';
import DiscussionForums from './DiscussionForums';

const CommunityScreen = ({ navigation }) => {
  const forums = [
    { id: 1, title: 'Anxiety Support Group', description: 'A forum for discussing anxiety-related issues.' },
    { id: 2, title: 'Depression Recovery', description: 'Join this group to share your experiences and find support.' },
  ];

  const handlePressForum = (forum) => {
    console.log('Joining forum:', forum);
  };

  return (
    <View style={styles.container}>
      <DiscussionForums forums={forums} onPressForum={handlePressForum} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default CommunityScreen;
