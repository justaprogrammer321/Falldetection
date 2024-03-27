import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Falldetectionparams from '../screens/Falldetectionvalues'
import Speechtotext from '../screens/Speechtotext';

const Stack = createStackNavigator();

export default function Userstack() {
  const [registered, setRegistered] = useState(false);

  const handleRegisterSuccess = () => {
    setRegistered(true); // Update the registered state
  };

  useEffect(() => {
    console.log("registered state updated:", registered);
  }, [registered]); // Log the updated value whenever 'registered' changes

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="Speechtotext"
            component={Speechtotext}
            options={{ headerShown: true }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

