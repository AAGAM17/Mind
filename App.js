import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { List, Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import AssessmentScreen from './src/screens/AssessmentScreen';
import ActivityDetailScreen from './src/screens/ActivityDetailScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import Login from './src/Auth/Login';
import Game from './src/screens/Game';
import MindfulnessChatbot from './src/screens/MindfulnessChatbot';
import { DiscussionForums, Notification, Profile } from './src/screens';
import { FIREBASE_AUTH } from './firebaseConfig';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import Story from './src/screens/Story';
import Music from './src/screens/Music';
import GameOne from './src/screens/Gameone';
import GameTwo from './src/screens/Gametwo';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName='Login'>
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Assessment" component={AssessmentScreen} />
    <Stack.Screen name="ActivityDetail" component={ActivityDetailScreen} />
    <Stack.Screen name="Community" component={CommunityScreen} />
    <Stack.Screen name="Game" component={Game} />
    <Stack.Screen name="Mindful" component={MindfulnessChatbot} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Notifications" component={Notification} />
    <Stack.Screen name="Story" component={Story} options={{ headerShown: false }}/>
    <Stack.Screen name="Music" component={Music} />
    <Stack.Screen name="DiscussionForums" component={DiscussionForums} />
    <Stack.Screen name="Gameone" component={GameOne} />
    <Stack.Screen name="Gametwo" component={GameTwo} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={MainStack} options={{ headerShown: false, tabBarIcon: ({focused}) =>{
            return <Entypo name="home" size={24} color={focused ? 'black' : 'grey'} />
          } }} />
          <Tab.Screen name="Notifications" component={Notification} options={{ tabBarIcon: ({focused}) => {
            return <Ionicons name="notifications" size={24} color={focused ? 'black' : 'grey'} />
          }}}/>
          <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: ({focused}) => {
            return <FontAwesome name="user" size={24} color={focused ? 'black' : 'grey'} />
          }}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
