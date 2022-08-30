import { publicRequest } from '../requestMethod';
import {
  addMissingFailure,
  addMissingStart,
  addMissingSuccess,
} from './missingRedux';

export const addMissing = async (missing, dispatch) => {
  dispatch(addMissingStart());
  try {
    const res = await publicRequest.post(`/missing`, missing);
    dispatch(addMissingSuccess(res.data));
  } catch (err) {
    dispatch(addMissingFailure());
  }
};
