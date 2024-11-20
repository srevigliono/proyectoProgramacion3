import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Users from '../screens/Users';
import newPost from '../screens/newPost';


const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
      <Tab.Screen name="New Post" component={newPost} />
      <Tab.Screen name="Users" component={Users} />
      <Tab.Screen name="Profile" component={Profile} />

    </Tab.Navigator>
  );
}
