import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [showCreateOrEditCollectionModal, setCreateOrEditCollectionModal] = useState(false);
  const [showCreateOrEditClipModal, setCreateOrEditClipModal] = useState(false);
  const [showBottomSheet, setBottomSheet] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [renderCreateCollectionModal, setRenderCreateCollectionModal] = useState(null);

  const contextValue = {
    showCreateOrEditCollectionModal,
    setCreateOrEditCollectionModal,
    showCreateOrEditClipModal,
    setCreateOrEditClipModal,
    showBottomSheet,
    setBottomSheet,
    setSelectedCollection,
    selectedCollection,
    setRenderCreateCollectionModal,
    renderCreateCollectionModal,
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
