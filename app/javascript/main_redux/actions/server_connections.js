import axios from 'axios'
import { setErrors, dropError } from './errors'

//index
export const getData = (path, setter) => (dispatch) => {
  axios.get(`http://localhost:3000/${path}`).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
};

//take my courses
export const getMyCourses = (setter, page) => (dispatch) => {
  axios.get(`http://localhost:3000/courses/my_courses?current_page=${page}`).then((response) => {
    dispatch(setter(response.data))
    console.log(response.data)
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
};

//take recommended courses
export const getRecommendedCourses = (setter, page) => (dispatch) => {
  axios.get(`http://localhost:3000/courses/recommended_courses?current_page=${page}`).then((response) => {
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

//connect organizations
export const connectOrganizations = (id, setter) => dispatch => {
  axios.post(`http://localhost:3000/users/${id}/connect_organizations`,{
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



//for impersonation

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



//with pagination

//search with pagination
export const searchDataPagination = (query, page, count_per_page, path, setter) => dispatch => {
  axios.get(`http://localhost:3000/${path}/search?term=${query}&current_page=${page}&count_per_page=${count_per_page}`)
       .then((response) => {
          dispatch(setter(response.data))
          dispatch(setErrors([]));
        }).catch(error => dispatch(dropError(error.response)))
}

//get data with pagination
export const getDataPagination = (path, page, count_per_page, setter) => (dispatch) => {
  axios.get(`http://localhost:3000/${path}?current_page=${page}`).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
};

//get data with pagination and query
export const getDataWithQueryPagination = (parrentId, page, count_per_page, path, setter) => (dispatch) => {
  axios.get(`http://localhost:3000/${path}?current_page=${page}&count_per_page=${count_per_page}&parent_id=${parrentId}`).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
};


//take done courses
export const getDoneCourses = (setter, page) => (dispatch) => {
  axios.get(`http://localhost:3000/user_courses/done_courses?current_page=${page}`).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
};

//take current courses
export const getCurrentCourses = (setter, page) => (dispatch) => {
  axios.get(`http://localhost:3000/user_courses/current_courses?current_page=${page}`).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
};


//take favorite courses
export const getFavoriteCourses = (setter, page) => (dispatch) => {
  axios.get(`http://localhost:3000/user_courses/favorite_courses?current_page=${page}`).then((response) => {
    dispatch(setter(response.data))
    dispatch(setErrors([]));
  }).catch(error => dispatch(dropError(error.response)))
};



