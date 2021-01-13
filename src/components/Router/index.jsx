import React from "react";
import { MainLayout } from "components/MainLayout";
import { News } from "screen/News";
import { FIRST_COLOR } from "constants/palette";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { feeds } from "constants/feeds";

import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export const Router = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      {feeds.map(({ name, url }, index) => (
        <Drawer.Screen name={name} key={`drawer-${index}`}>
          {() => (
            <MainLayout colorHeader={FIRST_COLOR}>
              <News mainColor={FIRST_COLOR} url={url} />
            </MainLayout>
          )}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  </NavigationContainer>
);
