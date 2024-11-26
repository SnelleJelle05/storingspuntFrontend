import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for contrast
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 24,
    },
    input: {
        width: '90%', // Use percentage for responsive width
        height: 50,
        backgroundColor: '#333333',
        color: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
        borderColor: '#555555',
        borderWidth: 1,
    },
    button: {
        width: '90%', // Use percentage for responsive width
        backgroundColor: '#FF6F61',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        width: '90%', // Use percentage for responsive width
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF6F61',
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    secondaryButtonText: {
        color: '#FF6F61',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagePreview: {
        width: '90%', // Use percentage for responsive width
        height: 200,
        borderRadius: 8,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
});

export default commonStyles;