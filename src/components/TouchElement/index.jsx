import React from "react";
import { TouchableOpacity } from "react-native";

export const TouchElement = ({ children, activeOpacity = 0.7, ...props }) => (
  <TouchableOpacity activeOpacity={activeOpacity} {...props}>
    {children}
  </TouchableOpacity>
);
