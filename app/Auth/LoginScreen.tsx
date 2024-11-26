import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import commonStyles from '../../assets/Css/CommonCSS';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const saveToken = async (key: string, token: string) => {
        try {
            await AsyncStorage.setItem(key, token);
        } catch (error) {
            console.error('Fout bij het opslaan van token:', error);
        }
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        } else {
            setEmailError('');
        }

        try {
            console.log(JSON.stringify({ email, password }));
            const response = await fetch('https://storingspunt-d02668d953a7.herokuapp.com/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Login failed: Invalid credentials');
                } else if (response.status === 500) {
                    throw new Error('Login failed: Server error');
                } else {
                    throw new Error(`Login failed: ${response.statusText}`);
                }
            }

            const data = await response.json();
            if (data.token) {
                await saveToken('authToken', data.token);
                alert('Success! Redirecting...');
                router.push('../Home/HomeScreen');
            } else {
                Alert.alert('Login failed', 'Please check your email and password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            if (error instanceof Error && error.message.includes('Network request failed')) {
                Alert.alert('Error', 'Network error. Please try again later.');
            } else if (error instanceof Error) {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#CCCCCC"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#CCCCCC"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => router.push('/Auth/RegisterScreen')}
            >
                <Text style={styles.secondaryButtonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    ...commonStyles,
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});