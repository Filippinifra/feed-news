import { COMMON_FIRST_COLOR, FIRST_COLOR } from "constants/palette";
import styled from "styled-components";

export const WrapperModal = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CardModal = styled.View`
  background-color: ${COMMON_FIRST_COLOR};
  width: 60%;
  padding: 35px;
  border-radius: 20px;
  align-items: center;
`;

export const Button = styled.View`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${FIRST_COLOR};
  border-radius: 10px;
  width: 100px;
  align-items: center;
  padding: ${({ isLoading }) => (isLoading ? "11px 0 0 0" : "10px")};
  height: ${({ isLoading }) => (isLoading ? "36px" : "auto")};
`;

export const ButtonText = styled.Text`
  font-weight: 600;
  color: ${COMMON_FIRST_COLOR};
`;
