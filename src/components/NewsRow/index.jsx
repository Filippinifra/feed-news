import React, { useState } from "react";
import { View, Text, Linking } from "react-native";
import { Card } from "components/Card";
import { TouchElement } from "components/TouchElement";
import { NewsImage, InfoWrapper, ViewMoreButtonWrapper } from "./styles";
import { Icon } from "react-native-elements";

export const NewsRow = ({
  title,
  description,
  image,
  url,
  color,
  onSavedFeed,
  onRemoveFeed,
  isSaved,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const numberOfLinesText = isOpen ? 10 : 3;

  return (
    <TouchElement onPress={() => setIsOpen(!isOpen)}>
      <Card color={color} title={title}>
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <InfoWrapper>
              <Text style={{ fontSize: 14 }} numberOfLines={numberOfLinesText}>
                {description}
              </Text>
            </InfoWrapper>
            {image && (
              <View
                style={{
                  marginLeft: 20,
                }}
              >
                <NewsImage source={{ url: image }} />
              </View>
            )}
          </View>
          {isOpen && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <View style={{ alignSelf: "center", marginRight: 10 }}>
                <TouchElement onPress={() => Linking.openURL(url)}>
                  <ViewMoreButtonWrapper color={color}>
                    <Icon name="exit-to-app" color={color} />
                    <Text style={{ fontSize: 14, color: color }}>
                      {"View more"}
                    </Text>
                  </ViewMoreButtonWrapper>
                </TouchElement>
              </View>
              <View style={{ alignSelf: "center" }}>
                <TouchElement onPress={isSaved ? onRemoveFeed : onSavedFeed}>
                  <ViewMoreButtonWrapper color={color}>
                    <Icon
                      name={isSaved ? "bookmark" : "bookmark-border"}
                      color={color}
                    />
                    <Text style={{ fontSize: 14, color: color }}>
                      {isSaved ? "Unsave this" : "Save this"}
                    </Text>
                  </ViewMoreButtonWrapper>
                </TouchElement>
              </View>
            </View>
          )}
        </View>
      </Card>
    </TouchElement>
  );
};
