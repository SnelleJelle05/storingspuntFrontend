import React from 'react';
import {StyleSheet, Button} from 'react-native';
import {router} from "expo-router";

export default function HomeScreen() {
    return (

        <Button title="Back to Login" onPress={() => router.push("/Auth/LoginScreen")} />

    )}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF6F61', // Fallback background color
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF', // Ensure text contrast
        fontWeight: 'bold',
    },
});

