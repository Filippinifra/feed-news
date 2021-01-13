import React from "react";
import { View, SafeAreaView } from "react-native";
import { COMMON_FIRST_COLOR } from "constants/palette";

export const MainLayout = ({ children, colorHeader }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorHeader }}>
      <View
        style={{
          flex: 1,
          backgroundColor: COMMON_FIRST_COLOR,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
