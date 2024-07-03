import * as SecureStore from 'expo-secure-store';

export const storeSimpleData = async (key: string, value: string) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (e) {
        return e
    }
};

export const getSimpleData = async (key: string) => {
    try {
        return await SecureStore.getItemAsync(key)
    } catch (e) {
        return e
    }
};


export const storeObject = async (key: string, value: object) => {
    try {
        const jsonValue = JSON.stringify(value);
        await SecureStore.setItemAsync(key, jsonValue)
    } catch (e) {
        return e
    }
};

export const getObject = async (key: string) => {
    try {
        const jsonValue = await SecureStore.getItemAsync(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        return e
    }
};

export const removeValueFromStorage = async (key: string) => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (e) {
        return e
    }
};