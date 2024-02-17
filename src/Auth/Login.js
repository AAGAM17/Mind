import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // New state to track login status
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('loggedIn');
      if (value !== null) {
        setLoggedIn(true);
        navigation.replace("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      setLoggedIn(true);
      await AsyncStorage.setItem('loggedIn', 'true');
      navigation.replace("Home");
    } catch (error) {
      console.log(error);
      alert('Sign In failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('User created successfully');
      setLoggedIn(true);
      await AsyncStorage.setItem('loggedIn', 'true');
      navigation.replace("Home");
    } catch (error) {
      console.log(error);
      alert('Sign Up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) {
    return null;
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Login" onPress={signIn} />
            <Button title="Sign Up" onPress={signUp} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    marginVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
  },
});

export default Login;
