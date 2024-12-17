export const handleDeleteDefect = async (id: number) => {
    try {
        const response = await fetch(`https://storingspunt-d02668d953a7.herokuapp.com/api/defects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete defect with id ${id}`);
        }
        return true;
    } catch (error) {
        console.error('Error deleting defect:', error);
        return false; // Return failure flag
    }
};
