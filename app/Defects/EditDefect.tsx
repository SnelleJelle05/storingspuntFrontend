import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {router} from "expo-router";
import {patchDefect} from '../Home/Crud/PatchDefect';
import {handleDeleteDefect} from '../Home/Crud/DeleteDefect';
import {useRoute} from '@react-navigation/native';

// @ts-ignore
export default function EditDefect() {
    const route = useRoute();
    // @ts-ignore
    const {defect} = route.params; // Extract the defect object from the route params
    const defectObj = JSON.parse(defect); // Deserialize the defect object from the route params

    const [title, setTitle] = useState(defectObj.title);
    const [description, setDescription] = useState(defectObj.description);
    const [location, setLocation] = useState(defectObj.location);
    const [category, setCategory] = useState(defectObj.category);

    // Refactor handleSave to be synchronous within the UI
    const handleSave = () => {
        const updateData = {title, description, location, category};
        (async () => {
            const success = await patchDefect(defectObj.id, updateData);
            if (success) {
                Alert.alert('Success', 'Defect updated successfully.');
                router.push('/Home/HomeScreen'); // Navigate back to the previous screen
            }
        })();
    };

    const handleDelete = async () => {
        const success = await handleDeleteDefect(defectObj.id);
        if (success) {
            Alert.alert('Success', 'Defect deleted successfully.');
            router.push('/Home/HomeScreen'); // Navigate back to the previous screen
        } else {
            Alert.alert('Error', 'Failed to delete defect.');
        }
    };

    const categories = ['algemeen', 'Hardware', 'Software', 'Systeem'];

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.label}>Location</Text>
            <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
            />
            <Text style={styles.label}>Category</Text>

            <View style={styles.categoryContainer}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.categoryButton, category === cat && styles.selectedCategoryButton]}
                        onPress={() => setCategory(cat)}
                    >
                        <Text
                            style={[styles.categoryButtonText, category === cat && styles.selectedCategoryButtonText]}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            {/*    uppercase first letter*/}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete()}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#222222',
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#333333',
        color: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    saveButton: {
        backgroundColor: '#FF6F61',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 12,
    },
    categoryButton: {
        flex: 1,
        backgroundColor: '#FF6F61',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    selectedCategoryButton: {
        backgroundColor: '#FF3B30',
    },
    categoryButtonText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    selectedCategoryButtonText: {
        color: '#FFFFFF',
    },
    deleteButton: {
        backgroundColor: '#007BFF',
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
});
