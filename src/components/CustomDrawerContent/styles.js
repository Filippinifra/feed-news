import { TouchElement } from "components/TouchElement";
import { FIRST_COLOR, SECOND_COLOR } from "constants/palette";
import styled from "styled-components";

export const Title = styled.Text`
  font-weight: 800;
  font-size: 26px;
  padding: 20px 10px 10px 10px;
`;

export const ButtonAddNew = styled(TouchElement)`
  background-color: ${FIRST_COLOR};
  margin: 10px 10px 10px 10px;
  border-radius: 4px;
  padding: 5px;
`;

export const ButtonSaved = styled(TouchElement)`
  margin: 10px 10px 10px 10px;
  border-radius: 4px;
  padding: 5px;
  background-color: ${SECOND_COLOR};
  top: 0;
  right: 0;
`;

export const TextItemContainer = styled.View`
  background-color: ${FIRST_COLOR};
  opacity: 0.4;
  margin: 5px 10px;
  padding: 10px;
  border-radius: 4px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
