import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';

const DiscussionForums = ({ forums, onPressForum, onCreateForum }) => {
  const [newForumTitle, setNewForumTitle] = useState('');
  const [newForumDescription, setNewForumDescription] = useState('');

  const handleJoinForum = (item) => {
    // Implement the logic to join the forum and save the state
    console.log('Joining forum:', item.title);
  };

  const handleCreateForum = () => {
    // Implement the logic to create a new forum and save the state
    console.log('Creating forum:', newForumTitle, newForumDescription);
    setNewForumTitle('');
    setNewForumDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discussion Forums</Text>
      <FlatList
        data={forums}
        renderItem={({ item }) => (
          <Card style={styles.forumCard}>
            <Card.Title title={item.title} />
            <Card.Content>
              <Text>{item.description}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleJoinForum(item)}>Join Forum</Button>
            </Card.Actions>
          </Card>
        )}
        keyExtractor={item => item.id.toString()}
      />

      <Text style={styles.title}>Create a Forum</Text>
      <TextInput
        label="Title"
        value={newForumTitle}
        onChangeText={text => setNewForumTitle(text)}
      />
      <TextInput
        label="Description"
        value={newForumDescription}
        onChangeText={text => setNewForumDescription(text)}
      />
      <Button onPress={handleCreateForum}>Create Forum</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  forumCard: {
    marginBottom: 10,
  },
});

export default DiscussionForums;