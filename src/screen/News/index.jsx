import React from "react";
import { NewsRow } from "components/NewsRow";
import { FlatList } from "react-native";
import _ from "lodash";
import { LoadAndError } from "components/LoadAndError";
import { NewsWrapper } from "./styles";
import { useNews } from "hook/useNews";
import { RAINBOW_COLORS } from "constants/palette";
import { getImageFeedItem } from "utils/getImageFeedItem";
import { useMemoTextEncoded } from "hook/useMemoTextEncoded";

const MemoizedNewsRow = ({ title, description, color, image, url }) => {
  const { text: titleConverted } = useMemoTextEncoded(title);
  const { text: desctiptionConverted } = useMemoTextEncoded(description);

  return (
    <NewsWrapper>
      <NewsRow
        color={color}
        title={titleConverted}
        description={desctiptionConverted}
        image={image}
        url={url}
      />
    </NewsWrapper>
  );
};

export const News = ({ mainColor, url }) => {
  const { news, image } = useNews(url);

  return (
    <LoadAndError data={news.length} color={mainColor}>
      <FlatList
        data={news}
        renderItem={({
          item: { description, title, links, content },
          index,
        }) => {
          const color = RAINBOW_COLORS[index % RAINBOW_COLORS.length];

          const imageUrl = getImageFeedItem(content, description) || image;

          return (
            <MemoizedNewsRow
              color={color}
              title={title}
              description={description}
              image={imageUrl}
              url={links[0].url}
            />
          );
        }}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
        keyExtractor={(item, index) => `news-element-${index}`}
      />
    </LoadAndError>
  );
};
