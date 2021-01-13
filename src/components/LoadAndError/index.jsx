import React from "react";
import { FIRST_COLOR, COMMON_ERROR_COLOR } from "constants/palette";
import { ActivityIndicator, Text } from "react-native";
import { CentrateView } from "./styles";

export const LoadAndError = ({
  data,
  error,
  color,
  children,
  isWaitingInput,
  waitingElement,
  loadWrapperStyle,
}) => {
  if (!data && !error) {
    return isWaitingInput ? (
      <CentrateView style={{ ...loadWrapperStyle }}>
        {waitingElement}
      </CentrateView>
    ) : (
      <CentrateView style={{ ...loadWrapperStyle }}>
        <ActivityIndicator
          size="small"
          color={color || FIRST_COLOR}
          size={"large"}
        />
      </CentrateView>
    );
  }

  if (error || !data) {
    return (
      <CentrateView>
        <Text style={{ color: COMMON_ERROR_COLOR }}>{"Error"}</Text>
      </CentrateView>
    );
  }

  return children;
};
