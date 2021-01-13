import AsyncStorage from "@react-native-community/async-storage";

export const STORAGE_LANG_KEY = "lang";

export const setStorageItem = async (item, value) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getStorageItem = async (
  item,
  callbackWithValue,
  callbackNoValue
) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      callbackWithValue(JSON.parse(value));
    } else {
      callbackNoValue();
    }
  } catch (error) {
    callbackNoValue();
  }
};
