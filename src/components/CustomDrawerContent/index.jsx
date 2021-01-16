import React, { useState } from "react";
import { InsertFeedPanel } from "components/InsertFeedPanel";
import { Alert, Text } from "react-native";
import { COMMON_FIRST_COLOR, THIRD_COLOR } from "constants/palette";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { ModalCustom } from "components/ModalCustom";
import {
  Title,
  ButtonSaved,
  ButtonAddNew,
  TextItemContainer,
  ItemContainer,
} from "./styles";
import { TouchElement } from "components/TouchElement";

export const AddNewFeedButton = ({ setModalVisible }) => (
  <ButtonAddNew onPress={() => setModalVisible(true)}>
    <Icon name="add" color={COMMON_FIRST_COLOR}></Icon>
  </ButtonAddNew>
);

export const CustomDrawerContent = (props) => {
  const [textNameFeed, setTextNameFeed] = useState("");
  const [urlFeed, setUrlFeed] = useState("");
  const [isLoading, setLoading] = useState(false);

  const {
    navigation,
    feedList,
    addNewFeed,
    isModalVisible,
    setModalVisible,
    removeFeed,
  } = props;

  const initializeFields = () => {
    setTextNameFeed("");
    setUrlFeed("");
  };

  const onConfirm = () => {
    if (textNameFeed && urlFeed) {
      setLoading(true);
      addNewFeed(
        textNameFeed,
        urlFeed,
        () => {
          setLoading(false);
          Alert.alert("Error adding new feed");
        },
        () => {
          initializeFields();
          setLoading(false);
          setModalVisible(false);
        }
      );
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <Title>My feed list</Title>
      {feedList.map(({ name }, index) => (
        <ItemContainer>
          <TouchElement
            key={`drawer-item-${index}`}
            onPress={() => navigation.navigate(name)}
            style={{ flexGrow: 1 }}
          >
            <TextItemContainer>
              <Text style={{ color: COMMON_FIRST_COLOR }}>{name}</Text>
            </TextItemContainer>
          </TouchElement>
          <TouchElement onPress={() => removeFeed(name)}>
            <Icon name="delete" style={{ marginRight: 10 }} />
          </TouchElement>
        </ItemContainer>
      ))}
      <AddNewFeedButton setModalVisible={setModalVisible} />
      <Title>My saved news</Title>
      <ButtonSaved>
        <Icon name="bookmark" color={THIRD_COLOR}></Icon>
      </ButtonSaved>
      <ModalCustom
        isVisible={isModalVisible}
        onConfirm={onConfirm}
        setVisible={setModalVisible}
        onCancel={initializeFields}
        confirmDisabled={!textNameFeed || !urlFeed || isLoading}
        isLoading={isLoading}
        cancelDisabled={isLoading}
      >
        <InsertFeedPanel
          textNameFeed={textNameFeed}
          setTextNameFeed={setTextNameFeed}
          urlFeed={urlFeed}
          setUrlFeed={setUrlFeed}
        />
      </ModalCustom>
    </DrawerContentScrollView>
  );
};
