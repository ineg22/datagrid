import { thunkLoadDataActionType } from '../types/actionTypes';
import { PersonType } from '../types/index';

import { endLoading, showError, startLoading } from '../actions/index';

const thunkLoadData = (count: number): thunkLoadDataActionType<void> => async (dispatch): Promise<void> => {
  const URL = `https://my.api.mockaroo.com/datagrid.json?key=${process.env.REACT_APP_NOT_SECRET_CODE}`;
  dispatch(startLoading());

  const fetchData = async (): Promise<void> =>
    fetch(URL)
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          const error = new Error(json.error);

          dispatch(showError(error));
        }
        dispatch(
          endLoading(
            json.slice(0, count).map((el: PersonType) => {
              return { ...el, app_version: Number(el.app_version) >= 1 };
            })
          )
        );
      });

  const result = await fetchData();
  return result;
};

export default thunkLoadData;
