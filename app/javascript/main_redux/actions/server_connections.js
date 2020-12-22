import axios from 'axios'
import { setErrors, dropError } from './errors'

//index
export const getData = (path, setter) => (dispatch) => {
  axios.get(`http://localhost:3000/${path}`).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
};

//index
export const getDataWithQuery = (id, path, setter) => (dispatch) => {
  axios.get(`http://localhost:3000/${path}?parent_id=${id}`).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
};

//show
export const getDataElement = (path, id, setter) => (dispatch) => {
  axios.get(`http://localhost:3000/${path}/${id}`).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
};

//destroy
export const destroyDataElement = (id, path, setter) => dispatch => {
  axios.delete(`http://localhost:3000/${path}/${id}`,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
}

export const destroyDataElementWithQuery = (id, parrentId, path, setter) => dispatch => {
  axios.delete(`http://localhost:3000/${path}/${id}?parent_id=${parrentId}`,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
}

//update
export const updateDataElement = (obj, path, setter) => dispatch => {
  axios.put(`http://localhost:3000/${path}/${obj.id}`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(setErrors(error.response.data.errors)))
}

//update
export const updateDataElementWithFormData = (obj, id, path, setter) => dispatch => {
  axios.put(`http://localhost:3000/${path}/${id}`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(setErrors(error.response.data.errors)))
}

//create
export const postDataElement = (obj, path, setter) => dispatch => {
  axios.post(`http://localhost:3000/${path}`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => {
    dispatch(setter(response.data));
    dispatch(setErrors([]));
  }).catch(error => dispatch(setErrors(error.response.data.errors)))
}

export const postDataElementWithQuery = (obj, parrentId, path, setter) => dispatch => {
  axios.post(`http://localhost:3000/${path}?parent_id=${parrentId}`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(setErrors(error.response.data.errors)))
}

//logout
export const logout = () => dispatch => {
  axios.delete(`http://localhost:3000/users/sign_out`, {
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => location.href = '/')
  .catch(error => location.href = '/users/sign_in')
}

//search
export const searchData = (query, path, setter) => dispatch => {
  axios.get(`http://localhost:3000/${path}/search?term=${query}`)
       .then((response) => {
          dispatch(setter(response.data))
          dispatch(setErrors([]));
        }).catch(error => dispatch(dropError(error.response)))
}

//impersonate
export const impersonate = (id, ord_id) => dispatch => {
  axios.post(`http://localhost:3000/users/${id}/impersonate?org_id=${ord_id}`, ord_id,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => location.href= '/').catch(error => dispatch(setErrors(error.response.data.errors)))
}

//stop impersonating
export const stopImpersonating = () => dispatch => {
  axios.post(`http://localhost:3000/users/stop_impersonating`, {},{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => location.href= '/').catch(error => dispatch(setErrors(error.response.data.errors)))
}