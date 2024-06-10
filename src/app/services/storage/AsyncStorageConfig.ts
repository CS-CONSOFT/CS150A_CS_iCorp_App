import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeSimpleData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        return e
    }
};

export const getSimpleData = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
        return e
    }
};


export const storeObject = async (key: string, value: object) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        return e
    }
};

export const getObject = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        return e
    }
};

export const removeValueFromStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        return e
    }
};