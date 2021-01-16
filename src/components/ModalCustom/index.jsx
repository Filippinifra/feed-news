import { TouchElement } from "components/TouchElement";
import React from "react";
import { Modal, View, ActivityIndicator } from "react-native";
import { WrapperModal, CardModal, Button, ButtonText } from "./styles";
import { ShadowStyle } from "components/Shadow";
import { COMMON_FIRST_COLOR } from "constants/palette";

export const ModalCustom = ({
  isVisible,
  setVisible,
  children,
  onConfirm,
  onCancel,
  confirmDisabled,
  isLoading,
  cancelDisabled,
}) => (
  <Modal animationType="slide" transparent={true} visible={isVisible}>
    <WrapperModal>
      <CardModal style={ShadowStyle.ShadowBox}>
        {children}
        <View style={{ flexDirection: "row" }}>
          <TouchElement onPress={onConfirm} disabled={confirmDisabled}>
            <Button
              style={{ ...ShadowStyle.ShadowBox, marginRight: 20 }}
              disabled={confirmDisabled}
              isLoading={isLoading}
            >
              <ButtonText>
                {isLoading ? (
                  <ActivityIndicator size="small" color={COMMON_FIRST_COLOR} />
                ) : (
                  "Confirm"
                )}
              </ButtonText>
            </Button>
          </TouchElement>
          <TouchElement
            onPress={() => {
              setVisible(false);
              if (onCancel) {
                onCancel();
              }
            }}
          >
            <Button style={ShadowStyle.ShadowBox} disabled={cancelDisabled}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </TouchElement>
        </View>
      </CardModal>
    </WrapperModal>
  </Modal>
);
