import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import commonStyles from '../../assets/Css/CommonCSS';

export default function AddDefect() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('algemeen');
    const [contentUrl, setContentUrl] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const router = useRouter();

    const handleAddDefect = async () => {
        try {
            const defectData = {
                title,
                description,
                location,
                category,
                contentUrl,
            };
            console.log('Payload sent to backend:', JSON.stringify(defectData));
            const response = await fetch('https://storingspunt-d02668d953a7.herokuapp.com/api/defects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(defectData),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Defect added successfully');
                router.push('/Home/HomeScreen');
            } else {
                Alert.alert('Error', data.message || 'Failed to add defect');
            }
        } catch (error) {
            console.error('Error adding defect:', error);
            Alert.alert('Error', 'An error occurred while adding the defect');
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setImage(selectedImage.uri);
            setContentUrl(selectedImage.uri);
        }
    };

    const categories = ['algemeen', 'Hardware', 'Software', 'Systeem'];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Defect</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#CCCCCC"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#CCCCCC"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                placeholderTextColor="#CCCCCC"
                value={location}
                onChangeText={setLocation}
            />
            <View style={styles.categoryContainer}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.categoryButton, category === cat && styles.selectedCategoryButton]}
                        onPress={() => setCategory(cat)}
                    >
                        <Text style={[styles.categoryButtonText, category === cat && styles.selectedCategoryButtonText]}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        {/*    uppercase first letter*/}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {image && (
                <Image
                    //preview image
                    source={{ uri: image }}
                    style={styles.imagePreview}
                />
            )}
            <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
                <Text style={styles.secondaryButtonText}>Take a Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAddDefect}>
                <Text style={styles.buttonText}>Add Defect</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    ...commonStyles,
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
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

    imagePreview: {
        width: '90%',
        height: 200,
        borderRadius: 8,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
});