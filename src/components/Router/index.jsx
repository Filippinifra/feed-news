import React, { useState } from "react";
import { MainLayout } from "components/MainLayout";
import { News } from "screen/News";
import { FIRST_COLOR } from "constants/palette";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Title, CenteredView, SubTitle } from "./styles";
import { useFeedList } from "hook/useFeedList";
import {
  CustomDrawerContent,
  AddNewFeedButton,
} from "components/CustomDrawerContent";
import { useSavedFeedList } from "hook/useSavedFeedList";
import { SavedNews } from "components/SavedNews";

const Drawer = createDrawerNavigator();

export const Router = () => {
  const {
    feedList,
    addNewFeed,
    removeFeed,
    modifyFeed,
    setFeedList,
  } = useFeedList();

  const [isModalVisible, setModalVisible] = useState(false);

  const { savedFeedList, addSavedFeed, removeSavedFeed } = useSavedFeedList();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            feedList={feedList}
            addNewFeed={addNewFeed}
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            removeFeed={removeFeed}
            modifyFeed={modifyFeed}
            setFeedList={setFeedList}
            savedFeedList={savedFeedList}
          />
        )}
      >
        {feedList.length ? (
          <>
            {feedList.map(({ name, url }, index) => (
              <Drawer.Screen name={name} key={`drawer-${index}`}>
                {() => (
                  <MainLayout colorHeader={FIRST_COLOR}>
                    <News
                      mainColor={FIRST_COLOR}
                      url={url}
                      nameFeed={name}
                      savedFeedList={savedFeedList}
                      addSavedFeed={addSavedFeed}
                      removeSavedFeed={removeSavedFeed}
                    />
                  </MainLayout>
                )}
              </Drawer.Screen>
            ))}
            <Drawer.Screen name={"saved-news"} key={`drawer-saved-news`}>
              {() => (
                <MainLayout colorHeader={FIRST_COLOR}>
                  <SavedNews
                    savedFeedList={savedFeedList}
                    removeSavedFeed={removeSavedFeed}
                  />
                </MainLayout>
              )}
            </Drawer.Screen>
          </>
        ) : (
          <Drawer.Screen name={"No data"} key={`drawer`}>
            {() => (
              <MainLayout colorHeader={FIRST_COLOR}>
                <CenteredView>
                  <Title>You have no data!</Title>
                  <SubTitle style={{ marginBottom: 20 }}>
                    Please add at least one feed
                  </SubTitle>
                  <AddNewFeedButton setModalVisible={setModalVisible} />
                </CenteredView>
              </MainLayout>
            )}
          </Drawer.Screen>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
