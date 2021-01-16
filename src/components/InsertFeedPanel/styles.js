import { COMMON_THIRD_COLOR } from "constants/palette";
import styled from "styled-components";

export const TextArea = styled.TextInput`
  padding: 4px 10px;
  border-width: 1px;
  border-radius: 20px;
  border-color: ${COMMON_THIRD_COLOR};
`;

export const PanelWrapper = styled.View`
  width: 220px;
`;

export const Title = styled.Text`
  font-weight: 500;
  font-size: 20px;
`;

export const SubTitle = styled.Text`
  font-weight: 300;
  font-size: 16px;
  color: ${COMMON_THIRD_COLOR};
`;

export const Label = styled.Text`
  font-weight: 300;
  font-size: 10px;
`;
