import { useState, useEffect } from "react";
import * as rssParser from "react-native-rss-parser";

export const useNews = (url) => {
  const [news, setNews] = useState([]);
  const [image, setImage] = useState(null);

  const fetchData = (url) =>
    fetch(url)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        const newsItems = rss?.items;
        const image = rss?.image?.url;
        setNews((news) => [...news, ...newsItems]);
        setImage(image);
      });

  useEffect(() => {
    fetchData(url);

    return () => setNews([]);
  }, []);

  return { news, image };
};
