import styled from "styled-components";
import { COMMON_FIRST_COLOR, COMMON_SECOND_COLOR } from "constants/palette";

export const CardWrapper = styled.View`
  border-radius: 20px;
  border-width: 5px;
  border-color: ${({ color }) => color};
  background-color: ${COMMON_FIRST_COLOR};
`;

export const HeaderWrapper = styled.View`
  padding: 15px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const Title = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;

export const Line = styled.View`
  background-color: ${COMMON_SECOND_COLOR};
  height: 1px;
  margin: 0px 10px;
`;
