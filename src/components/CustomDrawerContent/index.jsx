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
import Animated from "react-native-reanimated";

const {
  block,
  set,
  onChange,
  Clock,
  Value,
  startClock,
  stopClock,
  clockRunning,
  cond,
  spring,
  call,
} = Animated;

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

  const isActive = new Animated.Value(0);
  const clock = new Clock();
  const animConfig = {
    damping: 20,
    mass: 0.4,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.2,
    restDisplacementThreshold: 0.2,
    toValue: new Value(0),
  };
  const animState = {
    finished: new Value(0),
    velocity: new Value(0.8),
    position: new Value(1),
    time: new Value(0),
  };

  useEffect(() => {
    if (isModalVisible === false) {
      setIndexToModify(null);
      setModifying(false);
    }
  }, [isModalVisible]);

  const renderItem = ({ index, drag, isActive, item: { name, url } }) => (
    <Animated.View
      style={{
        elevation: isActive ? 10 : 0,
        shadowRadius: isActive ? 10 : 0,
        shadowColor: isActive ? "black" : "transparent",
        shadowOpacity: isActive ? 0.25 : 0,
        transform: [
          { scaleX: isActive ? animState.position : 1 },
          { scaleY: isActive ? animState.position : 1 },
        ],
        shadowOffset: {
          x: 0,
          y: 0,
        },
      }}
    >
      <ItemContainer key={`drawer-item-${index}`}>
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
        <TouchElement onPressIn={drag}>
          <Icon name="reorder" style={{ marginRight: 10 }} />
        </TouchElement>
      </ItemContainer>
    </Animated.View>
  );

  return (
    <DrawerContentScrollView {...props}>
      <Title>My feed list</Title>
      <DraggableFlatList
        data={feedList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        onDragEnd={(e) => setFeedList(e.data)}
        onDragBegin={() => isActive.setValue(1)}
        onRelease={() => isActive.setValue(0)}
      />
      <Animated.Code>
        {() =>
          block([
            onChange(isActive, [
              set(animConfig.toValue, cond(isActive, 1.1, 1)),
              startClock(clock),
            ]),
            cond(clockRunning(clock), [
              spring(clock, animState, animConfig),
              cond(animState.finished, [
                stopClock(clock),
                set(animState.finished, 0),
                set(animState.time, 0.8),
                set(animState.velocity, 0.8),
              ]),
            ]),
          ])
        }
      </Animated.Code>
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
