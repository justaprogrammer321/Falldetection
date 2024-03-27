import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Accelerometer, Gyroscope, requestPermissions } from 'expo-sensors';

export default function Falldetectionparams() {
    const [fallCount, setFallCount] = useState(0);
    
    useEffect(() => {
        // Subscribe to accelerometer updates
        const accelerometerSubscription = Accelerometer.addListener(({ x, y, z }) => {
          // Calculate magnitude of acceleration vector
          const accelerationMagnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    
          // Lowered thresholds for increased sensitivity
          const accelerationThreshold = 5; // Lowered threshold for acceleration magnitude
          const gyroscopeThreshold = 2; // Lowered threshold for gyroscope values
    
          // Simple condition for fall detection
          if (accelerationMagnitude > accelerationThreshold && Math.abs(x) > gyroscopeThreshold) {
            // Increment the fall count
            setFallCount(prevCount => prevCount + 1);
          }
        });
    
        // Unsubscribe from accelerometer updates when component unmounts
        return () => {
          accelerometerSubscription.remove();
        };
      }, []);
  return (
      <View style={styles.container}>
        <Text>Total Falls: {fallCount}</Text>
      </View>
  )
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });