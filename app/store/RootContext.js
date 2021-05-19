import React, { createContext, useReducer } from 'react';
import {
  CREATE_COLLECTION,
  CREATE_CLIP,
  EDIT_CLIP,
  DELETE_CLIP,
  MARK_AS_READ,
  DELETE_COLLECTION,
  EDIT_COLLECTION,
  SET_INITIAL_STATE,
} from './ActionCreator';
import { MainReducer } from './Reducer';

export const RootContext = createContext();

export const RootContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, { collection_list: [], data: [] });

  const createCollection = collectionName => {
    dispatch({ type: CREATE_COLLECTION, payload: { collection_name: collectionName } });
  };

  const createClip = (clip, collection_name) => {
    dispatch({ type: CREATE_CLIP, payload: { clip: clip, collection_name: collection_name } });
  };

  const editClip = (clip, collection_name, id) => {
    dispatch({ type: EDIT_CLIP, payload: { clip: clip, collection_name: collection_name, id: id } });
  };

  const deleteClip = id => {
    dispatch({ type: DELETE_CLIP, payload: { id: id } });
  };

  const markAsRead = id => {
    dispatch({ type: MARK_AS_READ, payload: { id: id } });
  };

  const deleteCollection = collection_name => {
    dispatch({ type: DELETE_COLLECTION, payload: { collection_name: collection_name } });
  };

  const editCollection = (initial_collection_name, collection_name) => {
    dispatch({ type: EDIT_COLLECTION, payload: { initial_value: initial_collection_name, collection_name: collection_name } });
  };

  const setInitialState = val => {
    dispatch({ type: SET_INITIAL_STATE, payload: { initial_state: val } });
  };

  const contextValue = {
    data: state,
    createCollection,
    createClip,
    editClip,
    deleteClip,
    markAsRead,
    editCollection,
    deleteCollection,
    setInitialState,
  };

  return <RootContext.Provider value={contextValue}>{children}</RootContext.Provider>;
};
