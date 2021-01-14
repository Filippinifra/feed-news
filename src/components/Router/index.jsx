import React from "react";
import { MainLayout } from "components/MainLayout";
import { News } from "screen/News";
import {
  COMMON_FIRST_COLOR,
  FIRST_COLOR,
  THIRD_COLOR,
} from "constants/palette";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { feeds } from "constants/feeds";
import { NavigationContainer } from "@react-navigation/native";
import { Title, ButtonAddNew, ButtonSaved } from "./styles";
import { Icon } from "react-native-elements";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <Title>My feed list</Title>

      {feeds.map(({ name }, index) => (
        <DrawerItem
          {...props}
          label={name}
          onPress={() => navigation.navigate(name)}
          style={{ backgroundColor: FIRST_COLOR, opacity: 0.4 }}
          labelStyle={{ color: COMMON_FIRST_COLOR }}
          key={`drawer-item-${index}`}
        />
      ))}
      <ButtonAddNew>
        <Icon name="add" color={COMMON_FIRST_COLOR}></Icon>
      </ButtonAddNew>
      <Title>My saved news</Title>
      <ButtonSaved name="bookmark" color={THIRD_COLOR}></ButtonSaved>
    </DrawerContentScrollView>
  );
};

export const Router = () => (
  <NavigationContainer>
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {feeds.map(({ name, url }, index) => (
        <Drawer.Screen name={name} key={`drawer-${index}`}>
          {() => (
            <MainLayout colorHeader={FIRST_COLOR}>
              <News mainColor={FIRST_COLOR} url={url} nameFeed={name} />
            </MainLayout>
          )}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  </NavigationContainer>
);
