import styled from "styled-components";
import { COMMON_SECOND_COLOR } from "constants/palette";

export const NewsImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 10px;
  background-color: ${COMMON_SECOND_COLOR};
`;

export const InfoWrapper = styled.View`
  flex: 1;
`;

export const ViewMoreButtonWrapper = styled.View`
  padding: 10px 0px;
  color: ${({ color }) => color};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  border: 2px solid ${({ color }) => color};
  flex-direction: row;
  width: 110px;
`;
