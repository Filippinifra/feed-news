import { useState, useEffect } from "react";
import { fetchUrl } from "utils/feed";
import {
  FEED_LIST_STORAGE_KEY,
  getStorageItem,
  setStorageItem,
} from "utils/storage";

//setStorageItem(FEED_LIST_STORAGE_KEY, [], () => {});

export const useFeedList = () => {
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    getStorageItem(FEED_LIST_STORAGE_KEY, setFeedList, () => {});

    return () => setFeedList([]);
  }, []);

  const updateFeedList = () =>
    getStorageItem(FEED_LIST_STORAGE_KEY, setFeedList, () => {});

  const addNewFeed = (
    textNameFeed,
    urlFeed,
    callbackError,
    callbackSuccess
  ) => {
    fetchUrl(
      urlFeed,
      () => {
        const isFeedYetInList = feedList.some(
          ({ name, url }) => name === textNameFeed || url === urlFeed
        );
        if (!isFeedYetInList) {
          const newItemList = [
            ...feedList,
            { name: textNameFeed, url: urlFeed },
          ];
          setStorageItem(FEED_LIST_STORAGE_KEY, newItemList);
          setFeedList(newItemList);
          callbackSuccess();
        } else {
          callbackError();
        }
      },
      callbackError
    );
  };

  const removeFeed = (feedToRemove) =>
    getStorageItem(
      FEED_LIST_STORAGE_KEY,
      (value) => {
        const isFeedToRemoveInside = value.some(
          ({ name }) => name === feedToRemove
        );
        if (isFeedToRemoveInside) {
          const indexFeedToRemove = value.findIndex(
            ({ name }) => name === feedToRemove
          );
          const newFeedList = value.split(indexFeedToRemove, 1);
          setFeedList(newFeedList);
          updateFeedList();
        }
      },
      () => {}
    );

  return { feedList, updateFeedList, addNewFeed, removeFeed };
};
