import AsyncStorage from "@react-native-community/async-storage";

export const FEED_LIST_STORAGE_KEY = "feed-list";
export const FEED_LIST_SAVED_STORAGE_KEY = "feed-list-saved";

export const setStorageItem = async (item, value) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getStorageItem = async (
  item,
  callbackForExistingValue,
  callbackForNullValue
) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      callbackForExistingValue(JSON.parse(value));
    } else {
      callbackForNullValue();
    }
  } catch (error) {
    callbackForNullValue();
  }
};
