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

const Drawer = createDrawerNavigator();

export const Router = () => {
  const { feedList, addNewFeed } = useFeedList();

  const [isModalVisible, setModalVisible] = useState(false);

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
          />
        )}
      >
        {feedList.length ? (
          feedList.map(({ name, url }, index) => (
            <Drawer.Screen name={name} key={`drawer-${index}`}>
              {() => (
                <MainLayout colorHeader={FIRST_COLOR}>
                  <News mainColor={FIRST_COLOR} url={url} nameFeed={name} />
                </MainLayout>
              )}
            </Drawer.Screen>
          ))
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
