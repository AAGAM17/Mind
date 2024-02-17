import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, {useState} from "react";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

const API_URL = "http://localhost:3000"

const StripeApp = props => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState(); 
  const { confirmPayment, loading } = useConfirmPayment();
  const fetchPaymentIntentClientSecret = async() => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {method: "POST", headers: { 'Content-Type': 'application/json'},});
    const {clientSecret, error} = await response.json();
    return {clientSecret, error};
  }
  const handlePayPress = async() => {
    if(!cardDetails?.complete || !email){
      Alert.alert("Please enter complete card details and email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    try{
      const {clientSecret, error} = await fetchPaymentIntentClientSecret();
      if(error){
        console.log("Unable to process payment");
      } else{
        const {paymentIntent, error} = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails,
        });
        if(error){
          alert(`Payment failed ${error.message}`);
        } else if(paymentIntent){
          alert("Paymrnt successful ")
          console.log("Success", paymentIntent);
        }
      }
    } catch(e){
      console.log(e);
    }
  }
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading}/>
    </View>
  );
};

export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20
  },
  input: {
    backgroundColor: "#efefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  }
});
