import styled from "styled-components";
import { FIRST_COLOR } from "constants/palette";

export const TextItemContainer = styled.View`
  background-color: ${FIRST_COLOR};
  opacity: 0.4;
  margin: 5px 0px;
  padding: 10px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
