import React from "react";
import { NewsRow } from "components/NewsRow";
import { FlatList, RefreshControl, View, Text } from "react-native";
import _ from "lodash";
import { LoadAndError } from "components/LoadAndError";
import { NewsWrapper, FirstTitleText, TitleName } from "./styles";
import { useNews } from "hook/useNews";
import { RAINBOW_COLORS } from "constants/palette";
import { getImageFeedItem } from "utils/feed";
import { useMemoTextEncoded } from "hook/useMemoTextEncoded";

const MemoizedNewsRow = ({
  title,
  description,
  color,
  image,
  url,
  onSavedFeed,
  savedFeedList,
  onRemoveFeed,
}) => {
  const { text: titleConverted } = useMemoTextEncoded(title);
  const { text: desctiptionConverted } = useMemoTextEncoded(description);

  const isSaved = savedFeedList.some(
    ({
      title: titleFeedSaved,
      description: descriptionFeedSaved,
      image: imageFeedSaved,
      url: urlFeedSaved,
    }) =>
      titleFeedSaved === title &&
      descriptionFeedSaved === description &&
      imageFeedSaved === image &&
      urlFeedSaved === url
  );

  return (
    <NewsWrapper>
      <NewsRow
        color={color}
        title={titleConverted}
        description={desctiptionConverted}
        image={image}
        url={url}
        onSavedFeed={() => {
          onSavedFeed(
            {
              title: titleConverted,
              description: desctiptionConverted,
              image,
              url,
            },
            () => {}
          );
        }}
        onRemoveFeed={() =>
          onRemoveFeed({
            title: titleConverted,
            description: desctiptionConverted,
            image,
            url,
          })
        }
        isSaved={isSaved}
      />
    </NewsWrapper>
  );
};

export const News = ({
  mainColor,
  url,
  nameFeed,
  savedFeedList,
  addSavedFeed,
  removeSavedFeed,
}) => {
  const { news, image, onRefresh, refreshing, error } = useNews(url);

  return (
    <LoadAndError data={news.length} color={mainColor} error={error}>
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
              onSavedFeed={addSavedFeed}
              savedFeedList={savedFeedList}
              onRemoveFeed={removeSavedFeed}
            />
          );
        }}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
        keyExtractor={(item, index) => `news-element-${index}`}
        refreshControl={
          <View style={{ top: 20 }}>
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          </View>
        }
        ListHeaderComponent={
          <View style={{ flexDirection: "row", padding: 20 }}>
            <Text>
              <FirstTitleText numberOfLines={1}>{"This is  "}</FirstTitleText>
              <TitleName numberOfLines={1}>{nameFeed} </TitleName>
            </Text>
          </View>
        }
      />
    </LoadAndError>
  );
};
