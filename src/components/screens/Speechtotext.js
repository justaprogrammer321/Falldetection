import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, ActivityIndicator } from 'react-native';
import Voice from '@react-native-voice/voice';
import { PermissionsAndroid } from 'react-native';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [microphonePermissionGranted, setMicrophonePermissionGranted] = useState(false);

  useEffect(() => {
    requestMicrophonePermission();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone to recognize speech.',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setMicrophonePermissionGranted(true);
      }
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
    }
  };

  const startListening = async () => {
    if (!microphonePermissionGranted) {
      return;
    }

    try {
      setIsLoading(true);
      await Voice.destroy();
      await Voice.init();

      Voice.onSpeechStart = () => {
        setIsListening(true);
        setIsLoading(false);
      };

      Voice.onSpeechEnd = () => {
        setIsListening(false);
      };

      Voice.onSpeechResults = (e) => {
        setRecognizedText(e.value[0]);
      };

      Voice.onSpeechError = (e) => {
        console.error('Speech recognition error:', e.error);
        setIsListening(false);
        setIsLoading(false);
      };

      await Voice.start('en-US');
    } catch (error) {
      console.error('Speech recognition failed:', error);
      setIsListening(false);
      setIsLoading(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Speech recognition stop failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Start Listening"
        onPress={startListening}
        disabled={!microphonePermissionGranted || isListening || isLoading}
      />
      <Button
        title="Stop Listening"
        onPress={stopListening}
        disabled={!isListening || isLoading}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {recognizedText !== '' && <Text>Recognized Text: {recognizedText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

export default SpeechToText;
