import { thunkLoadDataActionType, ActionTypes } from '../types/actionTypes';

import { endLoading, showError } from '../actions/index';

function fetchMockaroo(): Promise<ActionTypes> {
  const URL = `https://my.api.mockaroo.com/datagrid.json?key=${process.env.REACT_APP_NOT_SECRET_CODE}`;

  return fetch(URL)
    .then(res => res.json())
    .then(json => endLoading(json));
}

const thunkLoadData = (): thunkLoadDataActionType<void> => async (
  dispatch
): Promise<void> => {
  try {
    const actionWithData = await fetchMockaroo();
    dispatch(actionWithData);
  } catch (error) {
    dispatch(showError(error));
  }
};

export default thunkLoadData;
