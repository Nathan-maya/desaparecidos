import { publicRequest } from '../requestMethod';
import { clearFile } from './fileSlice';

import {
  addMissingFailure,
  addMissingStart,
  addMissingSuccess,
} from './missingRedux';
import { loginFailure, loginStart, loginSuccess } from './userSlice';


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

export const login = async(user,dispatch)=>{
  dispatch(loginStart());
  try{
    const res = await publicRequest.post(`auth/login`,user)
    console.log('realizando login')
    await dispatch(loginSuccess(res.data))
  } catch(err){
    console.log(err)
    dispatch(loginFailure())
  }
}

export const register = async(register)=>{
  try{
    await publicRequest.post('auth/register',register)
    console.log('enviando cadastro')
  }catch(err){
    console.log(err)
  }
}
