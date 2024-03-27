import Register from '../screens/Register'
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Authstack() {
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
            name="Register"
            options={{ headerShown: true }}
          >
            {(props) => <Register {...props} onRegisterSuccess={handleRegisterSuccess} />}
          </Stack.Screen>
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

