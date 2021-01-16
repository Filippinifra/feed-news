import React from "react";
import { TextArea, PanelWrapper, Title, SubTitle, Label } from "./styles";
import { ShadowStyle } from "components/Shadow";

export const InsertFeedPanel = ({
  textNameFeed,
  setTextNameFeed,
  urlFeed,
  setUrlFeed,
  isModifying,
}) => (
  <PanelWrapper>
    <Title style={{ alignSelf: "center", marginBottom: 5 }}>
      {isModifying ? "MODIFY FEED" : "ADD FEED"}
    </Title>
    <SubTitle style={{ marginBottom: 10 }}>
      {isModifying
        ? "Modify name and url of the feed"
        : "Insert name and url of the feed to add"}
    </SubTitle>
    <Label style={{ marginBottom: 2 }}>Name of feed</Label>
    <TextArea
      value={textNameFeed}
      style={{ marginBottom: 5, ...ShadowStyle.ShadowBox }}
      onChangeText={(text) => setTextNameFeed(text)}
      editable
    />
    <Label style={{ marginBottom: 2 }}>Url of feed</Label>
    <TextArea
      value={urlFeed}
      style={{ marginBottom: 20, ...ShadowStyle.ShadowBox }}
      onChangeText={(text) => setUrlFeed(text)}
      editable
    />
  </PanelWrapper>
);
