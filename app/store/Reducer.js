import { CREATE_COLLECTION, CREATE_CLIP, EDIT_CLIP, DELETE_CLIP } from './ActionCreator';
import { generateUniqueId } from '../utils/mainUtils';

const createCollection = (payload, state) => {
  const { name } = payload;
  let currentState = [...state.data];
  let currentCollectionList = [...state.collection_list];
  const uuid = generateUniqueId();
  const newCollectionDateObj = { id: uuid, articles: [], collection_name: name };
  currentState.push(newCollectionDateObj);
  currentCollectionList.push(name);
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
  return { ...state, data: currentState };
};

const editClip = (payload, state) => {
  const { clip, collection_name, id } = payload;
  let currentState = [...state.data];
  currentState.map(item => {
    if (item.articles.length) {
      return item.articles
        .map(articleItem => {
          if (articleItem.id === id) {
            if (item.collection_name === collection_name) {
              articleItem = { ...clip };
              return articleItem;
            } else {
              return null;
            }
          } else {
            return articleItem;
          }
        })
        .filter(item => item != null);
    } else {
      if (item.collection_name == collection_name) {
        const newClipDataObj = { id: id, ...clip };
        item.articles.push(newClipDataObj);
      }
      return item;
    }
  });
  console.log(currentState, 'Current State after editing');
  // return { ...state, data: currentState };
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
  return { ...state, data: currentState };
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
    default:
      return state;
  }
};
