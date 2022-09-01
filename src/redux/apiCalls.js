import { publicRequest } from '../requestMethod';
import { clearFile } from './fileSlice';

import {
  addMissingFailure,
  addMissingStart,
  addMissingSuccess,
} from './missingRedux';


export const addMissing = async (missing, dispatch) => {
  dispatch(addMissingStart());
  try {
    const res = await publicRequest.post(`/missing`, missing);
    console.log('realizando post')
    await dispatch(addMissingSuccess(res.data));
    console.log('chamando clearFile')
    dispatch(clearFile());
  } catch (err) {
    console.log(err)
    dispatch(addMissingFailure());
  }
};
