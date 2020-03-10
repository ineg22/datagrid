import { thunkLoadDataActionType, ActionTypes } from '../types/actionTypes';

import { startLoading, endLoading, showError } from '../actions/index';

const thunkLoadData = (count: number): thunkLoadDataActionType<void> => async (
  dispatch
): Promise<void> => {
  const fetchMockaroo = (count: number): Promise<ActionTypes | null> => {
    const URL = `https://my.api.mockaroo.com/datagrid.json?key=${process.env.REACT_APP_NOT_SECRET_CODE}`;

    return fetch(URL)
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          const error = new Error(json.error);

          dispatch(showError(error));
          return null;
        }
        return endLoading(json.slice(0, count));
      });
  };

  dispatch(startLoading());

  const actionWithData = await fetchMockaroo(count);
  if (actionWithData) dispatch(actionWithData);
};

export default thunkLoadData;
