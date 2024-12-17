import { Alert } from "react-native";

const handleDeleteDefect = (id: any) => {
    fetch(`https://storingspunt-d02668d953a7.herokuapp.com/api/defects/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete defect');
            }
            Alert.alert('Success', 'Defect deleted successfully.');
        })
        .catch((error) => {
            console.error('Error deleting defect:', error);
            Alert.alert('Error', 'Failed to delete defect.');
        });
}

export default handleDeleteDefect;