import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, StyleSheet, FlatList, Image, Alert, TouchableOpacity} from 'react-native';
import {router} from "expo-router";

export default function DefectsScreen() {
    const [defects, setDefects] = useState([]);

    useEffect(() => {
        const fetchDefects = async () => {
            try {
                const response = await fetch('https://storingspunt-d02668d953a7.herokuapp.com/api/defects');
                if (!response.ok) {
                    throw new Error('Failed to fetch defects');
                }

                const data = await response.json();
                setDefects(data.member);
            } catch (error) {
                console.error('Error fetching defects:', error);
                Alert.alert('Error', 'Failed to fetch defects from the server.');
            }
        };

        fetchDefects();
    }, []);
    console.log(defects[0]);

    // @ts-ignore
    const renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.category}>Categorie: {item.category}</Text>
                {item.contentUrl ? (
                    <Image
                        source={{uri: item.contentUrl}}
                        style={styles.image}
                    />
                ) : (
                    <Text style={styles.noImageText}>No Image Available</Text>
                )}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/Defects/AddDefect")}>
                <Text style={styles.buttonText}>Add Defect</Text>
            </TouchableOpacity>

            <FlatList
                data={defects}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16, // Reduced padding for better mobile layout
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    item: {
        width: '100%',
        marginBottom: 16,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#555555',
        backgroundColor: '#333333',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#FFFFFF',
        marginBottom: 8,
    },
    location: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    category: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    image: {
        width: '100%', // Responsive width to fit container
        height: 200, // Fixed height for consistency
        marginTop: 8,
        borderRadius: 8,
        borderColor: '#555555',
        borderWidth: 1,
    },
    noImageText: {
        fontStyle: 'italic',
        color: '#FF6F61',
        marginTop: 8,
        textAlign: 'center',
    },
    button: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#FF6F61',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
