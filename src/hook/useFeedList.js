import { useState, useEffect } from "react";
import { fetchUrl } from "utils/feed";
import {
  FEED_LIST_STORAGE_KEY,
  getStorageItem,
  setStorageItem,
} from "utils/storage";

//setStorageItem(FEED_LIST_STORAGE_KEY, [], () => {});
// setStorageItem(FEED_LIST_STORAGE_KEY, [
//   {
//     name: "Tech lab",
//     url: "http://feeds.arstechnica.com/arstechnica/technology-lab",
//   },
//   {
//     name: "Abc",
//     url: "http://feeds.arstechnica.com/arstechnica/technology-lab",
//   },
//   {
//     name: "Gfd",
//     url: "https://feeds.feedburner.com/TechCrunch/",
//   },
//   {
//     name: "Mit",
//     url: "https://www.technologyreview.com/topnews.rss",
//   },
// ]);

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

  return { feedList, updateFeedList, addNewFeed, removeFeed };
};
