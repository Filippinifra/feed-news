import { TouchElement } from "components/TouchElement";
import { COMMON_THIRD_COLOR } from "constants/palette";
import React from "react";
import styled from "styled-components";

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${COMMON_THIRD_COLOR};
`;

export const Row = styled(TouchElement)`
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  align-items: center;
`;
