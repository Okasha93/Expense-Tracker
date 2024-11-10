import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';;
import React from 'react';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='Main'>
        <Stack.Screen name="Main" component={BottomTabNavigation} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation