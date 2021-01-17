import { COMMON_THIRD_COLOR } from "constants/palette";
import React, { useState, useEffect } from "react";
import { View, LayoutAnimation, Platform, UIManager } from "react-native";
import { Icon } from "react-native-elements";
import { Title, Row } from "./styles";

export const Accordion = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((value) => !value);
  };

  return (
    <View>
      <Row onPress={toggleExpand}>
        <Title>{title}</Title>
        <Icon
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={30}
          color={COMMON_THIRD_COLOR}
        />
      </Row>
      {expanded && <View>{children}</View>}
    </View>
  );
};
