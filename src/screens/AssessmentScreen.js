import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const AssessmentScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Ask questions related to mindfulness' },
          ],
          max_tokens: 1000,
          temperature: 0.7,
          n: 5
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        }
      );
    console.log('Response:', response);

    const data = response.data;
    console.log('Response data:', data);

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No questions were generated. Please try again later.');
    }

    const generatedQuestions = data.choices.map(choice => {
      if (choice && choice.text) {
        return choice.text.trim();
      } else {
        return 'Invalid choice';
      }
    });

    console.log('Generated questions:', generatedQuestions);

    setQuestions(generatedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    // Display error message to the user
    Alert.alert('Error', error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mindfulness Assessment</Text>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.emojiContainer}>
            <TouchableOpacity onPress={() => handleResponse(index, '😊')}>
              <Text style={styles.emoji}>😊</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleResponse(index, '😐')}>
              <Text style={styles.emoji}>😐</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleResponse(index, '😔')}>
              <Text style={styles.emoji}>😔</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={() => console.log('Submitted responses:', responses)}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emoji: {
    fontSize: 30,
  },
  submitButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AssessmentScreen;
