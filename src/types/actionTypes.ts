export interface AddArticlePayloadType {
  tittle: string;
  id: number;
}

export interface AddArticleActionType {
  type: string;
  payload: AddArticlePayloadType;
}

export interface ArticleType {
  tittle: string;
  id: number;
}

export interface StateType {
  articles: Array<ArticleType>;
}
