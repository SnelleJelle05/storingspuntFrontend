export const patchDefect = async (id: number, updates: Record<string, any>) => {
    try {
        const response = await fetch(`https://storingspunt-d02668d953a7.herokuapp.com/api/defects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
            body: JSON.stringify(updates), // Serialize the update object
        });

        if (!response.ok) {
            throw new Error(`Failed to update defect with id ${id}`);
        }

        const data = await response.json();
        console.log('Success: Defect updated successfully.');
        return data; // Return the updated defect
    } catch (error) {
        console.error('Error updating defect:', error);
        console.log('Error: Failed to update defect.');
        return null; // Handle errors gracefully
    }
};
