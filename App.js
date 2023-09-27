import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Management from './components/Management';
import BranchList from './components/managements/branch/BranchList';
import BranchDetail from './components/managements/branch/BranchDetails';
import styles from './css/AppStyles';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Management" component={Management} />
        <Stack.Screen name="BranchList" component={BranchList} />
        <Stack.Screen name="BranchDetails" component={BranchDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
