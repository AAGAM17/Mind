import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import StripeApp from "../StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";

const Profile = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.setItem("isLoggedIn", "false");
  }, []);

  const handleSignOut = () => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        console.log('User signed out successfully');
        AsyncStorage.removeItem("isLoggedIn");
        navigation.replace('Login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <View style={styles.container}>
    <StripeProvider publishableKey="pk_test_51OkjWJSDcRpVOB6SfuXA0Qesh0q8vsRL2zXV0ytTs6ITzPQl9pglX8LqnQCqPSBeb7Yww95fP5860zom3ELv40ZY00c9MzD9O2">
      <StripeApp />
    </StripeProvider>
      <Text>Welcome to Profile Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
