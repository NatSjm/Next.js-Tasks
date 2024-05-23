export const getObjectFromFormData = (formData: FormData) => {
    let dataObject: { [key: string]: any } = {};
    const keys = ['name', 'description', 'deadline', 'priority'];

    keys.forEach(key => {
        const value = formData.get(key);
        if (value && value.toString().trim() !== '') {
            dataObject[key] = value;
        }
    });
    return dataObject;
}