import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import commonStyles from '../../assets/Css/AuthCSS';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
        console.log("!23414");
      const response = await fetch('https://127.0.0.1:8000/api/users ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data)
      if (data) {
        router.push("/Auth/LoginScreen");
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#CCCCCC"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#CCCCCC"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push("/Auth/LoginScreen")}
        >
          <Text style={styles.secondaryButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  ...commonStyles,
});
