import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert } from 'react-native';

export default function DefectsScreen() {
    const [defects, setDefects] = useState([]);

    useEffect(() => {
        const fetchDefects = async () => {
            try {
                // Gebruik een geldig IP of een externe URL voor de API.
                const response = await fetch('https://storingspunt-d02668d953a7.herokuapp.com/api/defects');
                if (!response.ok) {
                    throw new Error('Failed to fetch defects');
                }

                const data = await response.json();
                console.log('Defects:', data.member);
                setDefects(data.member);
            } catch (error) {
                console.error('Error fetching defects:', error);
                Alert.alert('Error', 'Failed to fetch defects from the server.');
            }
        };

        fetchDefects();
    }, []);

    // @ts-ignore
    const renderItem = ({ item }) => {
        const imageUrl = item.photo?.[0]; // Controleer of een foto bestaat.

        return (
            <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>{item.location}</Text>

                {imageUrl ? ( // Toon afbeelding alleen als een geldige URL bestaat.
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        onError={() => console.error(`Failed to load image: ${imageUrl}`)}
                    />
                ) : (
                    <Text style={styles.noImageText}>No Image Available</Text>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={defects}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparante achtergrond
    },
    item: {
        flex: 1,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#555555', // Donkergrijze scheiding
        backgroundColor: '#333333', // Donkere achtergrond
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF', // Witte tekstkleur
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#CCCCCC', // Lichtgrijze kleur
        marginBottom: 8,
    },
    location: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#AAAAAA', // Nog lichtere grijstint
        marginBottom: 12,
    },
    image: {
        width: '100%',
        height: 200, // Grotere afbeelding
        marginTop: 8,
        borderRadius: 8,
        borderColor: '#555555', // Dunne rand voor contrast
        borderWidth: 1,
    },
    noImageText: {
        fontStyle: 'italic',
        color: '#FF6F61', // Roodachtige accentkleur
        marginTop: 8,
        textAlign: 'center',
    },
    button: {
        width: '80%',
        backgroundColor: '#FF6F61', // Accentkleur
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        color: '#FFFFFF', // Witte tekst
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        width: '80%',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF6F61', // Accentkleur
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    secondaryButtonText: {
        color: '#FF6F61', // Accentkleur
        fontSize: 16,
        fontWeight: 'bold',
    },
});
