import React, { useState, useEffect } from "react";
import { Alert, Text } from "react-native";
import {
  COMMON_FIRST_COLOR,
  COMMON_SECOND_COLOR,
  THIRD_COLOR,
} from "constants/palette";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import {
  Title,
  ButtonSaved,
  ButtonAddNew,
  TextItemContainer,
  ItemContainer,
} from "./styles";
import { TouchElement } from "components/TouchElement";
import { NewOrEditFeedModal } from "components/NewOrEditFeedModal";
import DraggableFlatList from "react-native-draggable-flatlist";

export const AddNewFeedButton = ({ setModalVisible }) => (
  <ButtonAddNew onPress={() => setModalVisible(true)}>
    <Icon name="add" color={COMMON_FIRST_COLOR}></Icon>
  </ButtonAddNew>
);

export const CustomDrawerContent = (props) => {
  const [textNameFeed, setTextNameFeed] = useState("");
  const [urlFeed, setUrlFeed] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isModifying, setModifying] = useState(false);
  const [indexToModify, setIndexToModify] = useState(null);

  const {
    navigation,
    feedList,
    addNewFeed,
    isModalVisible,
    setModalVisible,
    removeFeed,
    modifyFeed,
    setFeedList,
  } = props;

  const initializeFields = () => {
    setTextNameFeed("");
    setUrlFeed("");
  };

  const onNewFeedConfirm = () => {
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

  const onEditFeedConfirm = () => {
    if (textNameFeed && urlFeed) {
      setLoading(true);
      modifyFeed(
        indexToModify,
        textNameFeed,
        urlFeed,
        () => {
          setLoading(false);
          Alert.alert("Error on modify feed");
        },
        () => {
          initializeFields();
          setLoading(false);
          setModalVisible(false);
        }
      );
    }
  };

  const modifyFeedItem = (index, name, url) => {
    setIndexToModify(index);
    setModifying(true);
    setTextNameFeed(name);
    setUrlFeed(url);
    setModalVisible(true);
  };

  useEffect(() => {
    if (isModalVisible === false) {
      setIndexToModify(null);
      setModifying(false);
    }
  }, [isModalVisible]);

  const renderItem = ({ index, drag, isActive, item: { name, url } }) => (
    <ItemContainer
      key={`drawer-item-${index}`}
      style={{
        backgroundColor: isActive ? COMMON_SECOND_COLOR : COMMON_FIRST_COLOR,
      }}
    >
      <TouchElement
        onPress={() => navigation.navigate(name)}
        style={{ flexGrow: 1, flexShrink: 1 }}
      >
        <TextItemContainer>
          <Text style={{ color: COMMON_FIRST_COLOR }} numberOfLines={1}>
            {name}
          </Text>
        </TextItemContainer>
      </TouchElement>
      <TouchElement onPress={() => modifyFeedItem(index, name, url)}>
        <Icon name="create" style={{ marginRight: 10 }} />
      </TouchElement>
      <TouchElement onPress={() => removeFeed(name)}>
        <Icon name="delete" style={{ marginRight: 10 }} />
      </TouchElement>
      <TouchElement onLongPress={drag}>
        <Icon name="reorder" style={{ marginRight: 10 }} />
      </TouchElement>
    </ItemContainer>
  );

  return (
    <DrawerContentScrollView {...props}>
      <Title>My feed list</Title>
      <DraggableFlatList
        data={feedList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        onDragEnd={(e) => setFeedList(e.data)}
      />
      <AddNewFeedButton setModalVisible={setModalVisible} />
      <Title>My saved news</Title>
      <ButtonSaved>
        <Icon name="bookmark" color={THIRD_COLOR}></Icon>
      </ButtonSaved>
      <NewOrEditFeedModal
        isVisible={isModalVisible}
        onConfirm={isModifying ? onEditFeedConfirm : onNewFeedConfirm}
        setVisible={setModalVisible}
        onCancel={initializeFields}
        confirmDisabled={!textNameFeed || !urlFeed || isLoading}
        isLoading={isLoading}
        cancelDisabled={isLoading}
        textNameFeed={textNameFeed}
        setTextNameFeed={setTextNameFeed}
        urlFeed={urlFeed}
        setUrlFeed={setUrlFeed}
        isModifying={isModifying}
      />
    </DrawerContentScrollView>
  );
};
