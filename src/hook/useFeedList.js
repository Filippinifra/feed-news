import { useState, useEffect } from "react";
import { fetchUrl } from "utils/feed";
import {
  FEED_LIST_STORAGE_KEY,
  getStorageItem,
  setStorageItem,
} from "utils/storage";

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
          updateFeedList();
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
          const newFeedList = value.filter(
            (el, index) => indexFeedToRemove !== index
          );
          setStorageItem(FEED_LIST_STORAGE_KEY, newFeedList);
          updateFeedList();
        }
      },
      () => {}
    );

  const modifyFeed = (
    indexFeed,
    textNameFeed,
    urlFeed,
    callbackError,
    callbackSuccess
  ) => {
    getStorageItem(
      FEED_LIST_STORAGE_KEY,
      (value) => {
        const isFeedYetInList = feedList.some(
          ({ name, url }, index) =>
            index !== indexFeed && (name === textNameFeed || url === urlFeed)
        );

        if (isFeedYetInList) {
          callbackError();
        } else {
          fetchUrl(
            urlFeed,
            () => {
              const newFeedList = value.map((el, index) => {
                if (indexFeed === index) {
                  return { name: textNameFeed, url: urlFeed };
                }

                return el;
              });
              setStorageItem(FEED_LIST_STORAGE_KEY, newFeedList);
              updateFeedList();
              callbackSuccess();
            },
            callbackError
          );
        }
      },
      () => {
        callbackError();
      }
    );
  };

  const setFeedListAndStorage = (data) => {
    setStorageItem(FEED_LIST_STORAGE_KEY, data);
    setFeedList(data);
    updateFeedList();
  };

  return {
    feedList,
    updateFeedList,
    addNewFeed,
    removeFeed,
    modifyFeed,
    setFeedList: setFeedListAndStorage,
  };
};
