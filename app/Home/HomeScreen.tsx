import React from 'react';
import {View, ScrollView, Text, StyleSheet, FlatList, Image, Alert, TouchableOpacity} from 'react-native';
import {router} from "expo-router";
import handleDeleteDefect from "./Crud/DeleteDefect";
import FetchDefect from "./Crud/FetchDefect";

export default function DefectsScreen() {

    const {defects} = FetchDefect();
    // @ts-ignore
    const defectsArray = defects['member']; // Extract the data from the object

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
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() =>
                        router.push({
                            pathname: "/Defects/EditDefect",
                            params: {defect: JSON.stringify(item)} // Serialize the defect object
                        })
                    }>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                        Alert.alert(
                            "Confirm Delete",
                            "Are you sure you want to delete this defect?",
                            [
                                {text: "Cancel", style: "cancel"},
                                {text: "Delete", onPress: () => handleDeleteDefect(item.id)}
                            ]
                        )
                    }
                >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    };

    // @ts-ignore
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/Defects/AddDefect")}>
                <Text style={styles.buttonText}>Add Defect</Text>
            </TouchableOpacity>

            <FlatList
                data={defectsArray}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                nestedScrollEnabled={true}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
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
        width: '100%',
        height: 200,
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
    editButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 8,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#FF4136',
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 8,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
})