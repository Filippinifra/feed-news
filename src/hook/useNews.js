import { useState, useEffect } from "react";
import { fetchUrl } from "utils/feed";

export const useNews = (url) => {
  const [news, setNews] = useState([]);
  const [image, setImage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = (url) => {
    setRefreshing(true);
    fetchUrl(
      url,
      (rss) => {
        const newsItems = rss?.items;
        const image = rss?.image?.url;
        setNews((news) => [...news, ...newsItems]);
        setImage(image);
        setRefreshing(false);
      },
      () => setIsError(true)
    );
  };

  const onRefresh = () => fetchData(url);

  useEffect(() => {
    fetchData(url);

    return () => setNews([]);
  }, []);

  return { news, image, onRefresh, refreshing, error: isError };
};
