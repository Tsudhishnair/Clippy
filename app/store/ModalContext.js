import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [showCreateOrEditCollectionModal, setCreateOrEditCollectionModal] = useState(false);
  const [showCreateOrEditClipModal, setCreateOrEditClipModal] = useState(false);
  const [showBottomSheet, setBottomSheet] = useState(false);

  const contextValue = {
    showCreateOrEditCollectionModal,
    setCreateOrEditCollectionModal,
    showCreateOrEditClipModal,
    setCreateOrEditClipModal,
    showBottomSheet,
    setBottomSheet,
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
