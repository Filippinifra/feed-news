import { NewsRow } from "components/NewsRow";
import { FOURTH_COLOR } from "constants/palette";
import React from "react";
import { View, Text, FlatList } from "react-native";
import { NewsWrapper, FirstTitleText, TitleName } from "./styles";

export const SavedNews = ({ savedFeedList, removeSavedFeed }) =>
  savedFeedList.length ? (
    <FlatList
      data={savedFeedList}
      renderItem={({ item: { description, title, url, image } }) => (
        <NewsWrapper>
          <NewsRow
            color={FOURTH_COLOR}
            title={title}
            description={description}
            image={image}
            url={url}
            onRemoveFeed={() =>
              removeSavedFeed({
                title,
                description,
                image,
                url,
              })
            }
            isSaved={true}
          />
        </NewsWrapper>
      )}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      keyExtractor={(item, index) => `news-element-${index}`}
      ListHeaderComponent={
        <View style={{ flexDirection: "row", padding: 20 }}>
          <Text>
            <FirstTitleText numberOfLines={1}>{"This is  "}</FirstTitleText>
            <TitleName numberOfLines={1}>{"My saved feeds"} </TitleName>
          </Text>
        </View>
      }
    />
  ) : (
    <>
      <View style={{ flexDirection: "row", padding: 20 }}>
        <Text>
          <FirstTitleText numberOfLines={1}>{"This is  "}</FirstTitleText>
          <TitleName numberOfLines={1}>{"My saved feeds"} </TitleName>
        </Text>
      </View>
      <FirstTitleText style={{ padding: 20 }}>
        You have no saved feed!
      </FirstTitleText>
    </>
  );
