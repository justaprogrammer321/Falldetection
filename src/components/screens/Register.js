import React, { useState } from 'react';
import { View, TextInput, Button, Alert,Text } from 'react-native';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../Firebase/firebaseconfig';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import Login from './Login';

const Register = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [oldPersonEmail, setOldPersonEmail] = useState('');
  const [oldPersonName, setOldPersonName] = useState('');
  const [yourName, setYourName] = useState('');
  const [password, setPassword] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  
  const navigation = useNavigation(); // Hook to access navigation object

  const handleRegister = async () => {
    const randomCode = Math.random().toString(36).substr(2, 8); // Generate a random 8-character code
    setGeneratedCode(randomCode);
    console.log('Generated Code:', randomCode);

    try {
      await setDoc(doc(db, "user",randomCode), {
        email: email,
        oldPersonEmail: oldPersonEmail,
        oldPersonName: oldPersonName,
        yourName: yourName,
        password: password,
        generatedCode: randomCode
      });
      onRegisterSuccess();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
        <>
          <TextInput
            placeholder="Your Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
          />
          <TextInput
            placeholder="Old Person's Email"
            onChangeText={(text) => setOldPersonEmail(text)}
            value={oldPersonEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
          />
          <TextInput
            placeholder="Name of Old Person"
            onChangeText={(text) => setOldPersonName(text)}
            value={oldPersonName}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            placeholder="Your Name"
            onChangeText={(text) => setYourName(text)}
            value={yourName}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            style={{ marginBottom: 10 }}
          />
          <Button title="Register" onPress={handleRegister} />
          <Text style={{ marginTop: 10 }}>Already have an account? <Text onPress={() => navigation.navigate('Login')}>Login</Text></Text>
        </>
    </View>
  );
};

export default Register;
