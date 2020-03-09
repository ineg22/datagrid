import { ADD_ARTICLE } from '../constants/action-types';
import {
  AddArticlePayloadType,
  AddArticleActionType,
} from '../types/actionTypes';

export function addArticle(
  payload: AddArticlePayloadType
): AddArticleActionType {
  return { type: ADD_ARTICLE, payload };
}
