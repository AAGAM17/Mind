import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

const MindfulnessChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    
    setChatHistory([...chatHistory, { message: inputText, sender: 'user' }]);
    console.log('Chat history:', chatHistory);

    try {
      // Call OpenAI API to get response
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'system', content: 'You are a mindfulness chatbot.' }, { role: 'user', content: inputText }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer OPEN_API_KEY', // Replace with your OpenAI API key
          },
        }
      );
      console.log('Chat history:', chatHistory);

      // Add AI response to chat history
      setChatHistory([...chatHistory, { message: response.data.choices[0].message.content, sender: 'bot' }]);
      console.log('Chat history:', chatHistory);
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
      // Handle error
    } finally {
      setInputText(''); // Clear input text after sending message
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <ScrollView contentContainerStyle={styles.container}>
        {chatHistory.map((chat, index) => (
          <View key={index} style={chat.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
            <Text style={styles.messageText}>{chat.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      padding: 20,
    },
    userMessageContainer: {
      alignSelf: 'flex-end',
      backgroundColor: '#DCF8C6',
      borderRadius: 8,
      maxWidth: '80%',
      marginBottom: 10,
      padding: 10,
    },
    botMessageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#E5E7EB',
      borderRadius: 8,
      maxWidth: '80%',
      marginBottom: 10,
      padding: 10,
    },
    messageText: {
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 40,
      marginBottom: 2,
    },
    input: {
      flex: 1,
      marginRight: 10,
      padding: 10,
      backgroundColor: '#F3F4F6',
      borderRadius: 8,
    },
  });
  export default MindfulnessChatBot;
