import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from "expo-router";

export default function HomeScreen() {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/Auth/LoginScreen");
        }, 50); // 2-second delay

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for contrast
    },
});