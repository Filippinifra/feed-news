import React from "react";
import { greenFeed, politicsFeed, sportFeed, techFeed } from "constants/feeds";
import { COMMON_FIRST_COLOR } from "constants/palette";
import { FlatList, Text, View, Alert } from "react-native";
import { TextItemContainer } from "./styles";
import { Accordion } from "components/Accordion";
import { Icon } from "react-native-elements";
import { TouchElement } from "components/TouchElement";

export const RaccomendedFeeds = ({ feedList, addNewFeed }) => {
  const onClickAddIcon = (name, url) => {
    addNewFeed(
      name,
      url,
      () => {
        Alert.alert("Error adding new feed");
      },
      () => {}
    );
  };

  const removingExistingFeed = (feedCategoryList) =>
    feedCategoryList.filter(
      (feedCategoryItem) =>
        !feedList.some(
          (feedListItem) => feedListItem.url === feedCategoryItem.url
        )
    );

  const FlatListCategory = ({ list }) =>
    removingExistingFeed(list).length ? (
      <FlatList
        data={removingExistingFeed(list)}
        renderItem={({ item: { name, url } }) => (
          <TouchElement onPress={() => onClickAddIcon(name, url)}>
            <TextItemContainer>
              <Text
                numberOfLines={1}
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  color: COMMON_FIRST_COLOR,
                }}
              >
                {name}
              </Text>
              <Icon name="add" color={COMMON_FIRST_COLOR} size={18} />
            </TextItemContainer>
          </TouchElement>
        )}
        keyExtractor={(item, index) => `news-element-${index}`}
      />
    ) : (
      <Text style={{ marginBottom: 5 }}>No feed available</Text>
    );

  return (
    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <Accordion title={"Tech"}>
        <FlatListCategory list={techFeed} />
      </Accordion>
      <Accordion title={"Sport"}>
        <FlatListCategory list={sportFeed} />
      </Accordion>
      <Accordion title={"Politics"}>
        <FlatListCategory list={politicsFeed} />
      </Accordion>
      <Accordion title={"Green"}>
        <FlatListCategory list={greenFeed} />
      </Accordion>
    </View>
  );
};
