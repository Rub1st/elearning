import axios from 'axios'

//index
export const getData = (path, setter) => (dispatch) => {
  axios.get(`http://localhost:3000/${path}`).then((response) => {
         dispatch(setter(response.data));
  });
};

//index
export const getDataWithQuery = (id, path, setter) => (dispatch) => {
  axios.get(`http://localhost:3000/${path}?parent_id=${id}`).then((response) => {
         dispatch(setter(response.data));
  });
};

//show
export const getDataElement = (path, id, setter) => (dispatch) => {
  axios.get(`http://localhost:3000/${path}/${id}`).then((response) => {
    dispatch(setter(response.data));
  });
};

//destroy
export const destroyDataElement = (id, path, setter) => dispatch => {
  axios.delete(`http://localhost:3000/${path}/${id}`,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => dispatch(setter(response.data)))
}

export const destroyDataElementWithQuery = (id, parrentId, path, setter) => dispatch => {
  axios.delete(`http://localhost:3000/${path}/${id}?parent_id=${parrentId}`,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => dispatch(setter(response.data)))
}

//update
export const updateDataElement = (obj, path, setter) => dispatch => {
  axios.put(`http://localhost:3000/${path}/${obj.id}`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => dispatch(setter(response.data)))
}

//update
export const updateDataElementWithFormData = (obj, id, path, setter) => dispatch => {
  axios.put(`http://localhost:3000/${path}/${id}`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => dispatch(setter(response.data)))
}

//create
export const postDataElement = (obj, path, setter) => dispatch => {
  axios.post(`http://localhost:3000/${path}`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => dispatch(setter(response.data)))
}

export const postDataElementWithQuery = (obj, parrentId, path, setter) => dispatch => {
  axios.post(`http://localhost:3000/${path}?parent_id=${parrentId}`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => dispatch(setter(response.data)))
}

//logout
export const logout = () => dispatch => {
  axios.delete(`http://localhost:3000/users/sign_out`, {
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => window.location = "http://localhost:3000/" )
}

//search
export const searchData = (query, path, setter) => dispatch => {
  axios.get(`http://localhost:3000/${path}/search?term=${query}`)
       .then((response) => dispatch(setter(response.data)))
}
