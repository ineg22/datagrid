import { AddArticleActionType, StateType } from '../types/actionTypes';
import { ADD_ARTICLE } from '../constants/action-types';

const initialState = {
  articles: [],
};

function rootReducer(
  state: StateType = initialState,
  action: AddArticleActionType
): StateType {
  if (action.type === ADD_ARTICLE) {
    // return Object.assign({}, state, {
    //   articles: state.articles.concat(action.payload),
    // });

    return { ...state, articles: [...state.articles, action.payload] };
  }
  return state;
}

export default rootReducer;
