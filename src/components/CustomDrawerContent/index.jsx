import React, { useState } from "react";
import { InsertFeedPanel } from "components/InsertFeedPanel";
import { Alert } from "react-native";
import {
  COMMON_FIRST_COLOR,
  FIRST_COLOR,
  THIRD_COLOR,
} from "constants/palette";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { ModalCustom } from "components/ModalCustom";
import { Title, ButtonSaved, ButtonAddNew } from "./styles";

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
        <DrawerItem
          {...props}
          label={name}
          onPress={() => navigation.navigate(name)}
          style={{ backgroundColor: FIRST_COLOR, opacity: 0.4 }}
          labelStyle={{ color: COMMON_FIRST_COLOR }}
          key={`drawer-item-${index}`}
        />
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
