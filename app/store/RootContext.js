import React, { createContext, useReducer } from 'react';
import { CREATE_COLLECTION, CREATE_CLIP, EDIT_CLIP, DELETE_CLIP } from './ActionCreator';
import { MainReducer } from './Reducer';

export const RootContext = createContext();

export const RootContextProvide = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, { collection_list: [], data: [] });

  const createCollection = collectionName => {
    dispatch({ type: CREATE_COLLECTION, payload: { name: collectionName } });
  };

  const createClip = (clip, collection_name) => {
    dispatch({ type: CREATE_CLIP, payload: { clip: clip, collection_name: collection_name } });
  };

  const editClip = (clip, id) => {
    dispatch({ type: EDIT_CLIP, payload: { clip: clip, id: id } });
  };

  const deleteClip = id => {
    dispatch({ type: DELETE_CLIP, payload: { id: id } });
  };

  const contextValue = {
    data: state,
    createCollection,
    createClip,
    editClip,
    deleteClip,
  };

  return <RootContext.Provider value={contextValue}>{children}</RootContext.Provider>;
};
