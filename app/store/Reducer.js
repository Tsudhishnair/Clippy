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
import { generateUniqueId } from '../utils/mainUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createCollection = (payload, state) => {
  const { collection_name } = payload;
  let currentState = [...state.data];
  let currentCollectionList = [...state.collection_list];
  const uuid = generateUniqueId();
  const newCollectionDateObj = { id: uuid, articles: [], collection_name: collection_name };
  currentState.push(newCollectionDateObj);
  currentCollectionList.push(collection_name);
  setAsyncStorage({ collection_list: currentCollectionList, data: currentState });
  return { collection_list: currentCollectionList, data: currentState };
};

const createClip = (payload, state) => {
  const { clip, collection_name } = payload;
  let currentState = [...state.data];
  const uuid = generateUniqueId();
  currentState.map(item => {
    if (item.collection_name === collection_name) {
      const newClipDataObj = { id: uuid, ...clip };
      item.articles.push(newClipDataObj);
      return item;
    } else return item;
  });
  setAsyncStorage({ ...state, data: currentState });
  return { ...state, data: currentState };
};

const editClip = (payload, state) => {
  const { clip, collection_name, id } = payload;
  let currentState = [...state.data];
  let collectionNameChanged = false;
  let updatedDataState = currentState.map(item => {
    if (item.articles.length) {
      let updateArticleItemList = item.articles
        .map(articleItem => {
          if (articleItem.id === id) {
            if (item.collection_name === collection_name) {
              articleItem['url'] = clip.url;
              articleItem['title'] = clip.title;
              return articleItem;
            } else {
              collectionNameChanged = true;
              return null;
            }
          } else {
            return articleItem;
          }
        })
        .filter(item => item !== null);
      return { id: item.id, collection_name: item.collection_name, articles: updateArticleItemList };
    } else {
      return item;
    }
  });
  if (collectionNameChanged) {
    updatedDataState.map(item => {
      if (item.collection_name === collection_name) {
        const newClipDataObj = { id: id, ...clip };
        item.articles.push(newClipDataObj);
      }
      return item;
    });
  }
  setAsyncStorage({ ...state, data: updatedDataState });
  return { ...state, data: updatedDataState };
};

const deleteClip = (payload, state) => {
  const { id } = payload;
  let currentState = [...state.data];
  currentState.map(item => {
    if (item.articles.length) {
      let updateArticleItems = item.articles.filter(item => item.id !== id);
      item.articles = updateArticleItems;
      return item;
    } else {
      return item;
    }
  });
  setAsyncStorage({ ...state, data: currentState });
  return { ...state, data: currentState };
};

const markAsRead = (payload, state) => {
  const { id } = payload;
  let currentState = [...state.data];
  currentState.map(item => {
    if (item.articles.length) {
      return item.articles.map(articleItem => {
        if (articleItem.id === id) {
          articleItem['hasRead'] = true;
          return articleItem;
        } else {
          return articleItem;
        }
      });
    }
  });
  setAsyncStorage({ ...state, data: currentState });
  return { ...state, data: currentState };
};

const deleteCollection = (payload, state) => {
  const { collection_name } = payload;
  const currentState = [...state.data];
  const currentCollectionList = [...state.collection_list];
  const updatedCollectionList = currentCollectionList.filter(item => item != collection_name);
  const updatedState = currentState.filter(item => item.collection_name != collection_name);
  setAsyncStorage({ ...state, data: updatedState, collection_list: updatedCollectionList });
  return { ...state, data: updatedState, collection_list: updatedCollectionList };
};

const editCollection = (payload, state) => {
  const { initial_value, collection_name } = payload;
  const currentState = [...state.data];
  let currentCollectionList = [...state.collection_list];
  currentState.map(item => {
    if (item.collection_name === initial_value) {
      item.collection_name = collection_name;
      return item;
    } else {
      return item;
    }
  });
  let indexOfItem = currentCollectionList.indexOf(initial_value);
  currentCollectionList[indexOfItem] = collection_name;
  setAsyncStorage({ ...state, data: currentState, collection_list: currentCollectionList });
  return { ...state, data: currentState, collection_list: currentCollectionList };
};

const setInitialState = (payload, state) => {
  const { initial_state } = payload;
  return { ...initial_state };
};

const setAsyncStorage = async value => {
  try {
    const dataObj = { ...value };
    await AsyncStorage.setItem('clippyState', JSON.stringify(dataObj));
  } catch (error) {
    console.log(error);
  }
};

export const MainReducer = (state, action) => {
  switch (action.type) {
    case CREATE_COLLECTION:
      return createCollection(action.payload, state);
    case CREATE_CLIP:
      return createClip(action.payload, state);
    case EDIT_CLIP:
      return editClip(action.payload, state);
    case DELETE_CLIP:
      return deleteClip(action.payload, state);
    case MARK_AS_READ:
      return markAsRead(action.payload, state);
    case EDIT_COLLECTION:
      return editCollection(action.payload, state);
    case DELETE_COLLECTION:
      return deleteCollection(action.payload, state);
    case SET_INITIAL_STATE:
      return setInitialState(action.payload, state);
    default:
      return state;
  }
};
