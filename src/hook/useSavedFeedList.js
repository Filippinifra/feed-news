import { useState, useEffect } from "react";
import {
  FEED_LIST_SAVED_STORAGE_KEY,
  getStorageItem,
  setStorageItem,
} from "utils/storage";

export const useSavedFeedList = () => {
  const [savedFeedList, setSavedFeedList] = useState([]);

  useEffect(() => {
    getStorageItem(FEED_LIST_SAVED_STORAGE_KEY, setSavedFeedList, () => {});

    return () => setSavedFeedList([]);
  }, []);

  const updateSavedFeedList = () =>
    getStorageItem(FEED_LIST_SAVED_STORAGE_KEY, setSavedFeedList, () => {});

  const addSavedFeed = (feed, callbackSuccess) => {
    const isFeedYetInList = savedFeedList.some(
      ({ title, description, image, url }) =>
        title === feed.title &&
        description === feed.description &&
        image === feed.image &&
        url === feed.url
    );

    if (!isFeedYetInList) {
      const newItemList = [
        ...savedFeedList,
        {
          title: feed.title,
          description: feed.description,
          image: feed.image,
          url: feed.url,
        },
      ];

      setStorageItem(FEED_LIST_SAVED_STORAGE_KEY, newItemList);
      updateSavedFeedList();
      callbackSuccess();
    }
  };

  const removeSavedFeed = (feedToRemove) =>
    getStorageItem(
      FEED_LIST_SAVED_STORAGE_KEY,
      (value) => {
        const isFeedYetInList = value.some(
          ({ title, description, image, url }) =>
            title === feedToRemove.title &&
            description === feedToRemove.description &&
            image === feedToRemove.image &&
            url === feedToRemove.url
        );

        if (isFeedYetInList) {
          const indexFeedToRemove = value.findIndex(
            ({ title, description, image, url }) =>
              title === feedToRemove.title &&
              description === feedToRemove.description &&
              image === feedToRemove.image &&
              url === feedToRemove.url
          );

          const newFeedList = value.filter(
            (el, index) => indexFeedToRemove !== index
          );

          setStorageItem(FEED_LIST_SAVED_STORAGE_KEY, newFeedList);
          updateSavedFeedList();
        }
      },
      () => {}
    );

  return {
    savedFeedList: savedFeedList.reverse(),
    updateSavedFeedList,
    addSavedFeed,
    removeSavedFeed,
  };
};
