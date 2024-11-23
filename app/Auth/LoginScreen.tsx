import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import commonStyles from '../../assets/Css/AuthCSS';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // Token opslaan in AsyncStorage
    const saveToken = async (key: string, token: string) => {
        try {
            await AsyncStorage.setItem(key, token);
        } catch (error) {
            console.error('Fout bij het opslaan van token:', error);
        }
    };

    const handleLogin = async () => {
        try {
            console.log(JSON.stringify({ email, password }));
            // Zorg ervoor dat het juiste API-endpoint wordt gebruikt.
            const response = await fetch('https://storingspunt-d02668d953a7.herokuapp.com/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            console.log("response", response);
            if (!response.ok) {
                throw new Error('Login mislukt: ongeldige credentials');
            }

            const data = await response.json();
            console.log(response);
            if (data.token) {
                await saveToken('authToken', data.token); // Token opslaan
                alert('Sucsess! /redirect')
                router.push('../Home/HomeScreen'); // Navigeren naar de volgende pagina
            } else {
                Alert.alert('Login mislukt', 'Controleer je e-mail en wachtwoord');
            }
            console.log(response);
        } catch (error) {
            console.log('Fout bij het inloggen:', error);
            Alert.alert('Fout', 'Er ging iets mis bij het inloggen.');
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
});
