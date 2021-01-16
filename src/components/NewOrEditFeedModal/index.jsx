import React from "react";
import { InsertFeedPanel } from "components/InsertFeedPanel";
import { ModalCustom } from "components/ModalCustom";

export const NewOrEditFeedModal = ({
  isVisible,
  onConfirm,
  setVisible,
  onCancel,
  confirmDisabled,
  isLoading,
  cancelDisabled,
  textNameFeed,
  setTextNameFeed,
  urlFeed,
  setUrlFeed,
  isModifying,
}) => (
  <ModalCustom
    isVisible={isVisible}
    onConfirm={onConfirm}
    setVisible={setVisible}
    onCancel={onCancel}
    confirmDisabled={confirmDisabled}
    isLoading={isLoading}
    cancelDisabled={cancelDisabled}
  >
    <InsertFeedPanel
      textNameFeed={textNameFeed}
      setTextNameFeed={setTextNameFeed}
      urlFeed={urlFeed}
      setUrlFeed={setUrlFeed}
      isModifying={isModifying}
    />
  </ModalCustom>
);
