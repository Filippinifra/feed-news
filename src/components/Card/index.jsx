import React from "react";
import { View } from "react-native";
import { ShadowStyle } from "components/Shadow";
import { CardWrapper, HeaderWrapper, Title, Line } from "./styles";

export const Card = ({ children, title, color, numberOfLines }) => (
  <View style={ShadowStyle.ShadowBox}>
    <CardWrapper color={color}>
      <View>
        <HeaderWrapper color={color} s>
          <Title numberOfLines={numberOfLines}>{title}</Title>
        </HeaderWrapper>
        <Line />
        {children}
      </View>
    </CardWrapper>
  </View>
);
