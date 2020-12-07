import axios from 'axios'

axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('authorization');
  config.headers['Access-Control-Allow-Credentials'] = true
  config.headers.Authorization = token;
  console.log('intersepter' + token)
  return config;
});

//index
export const getData = (path, setter) => (dispatch) => {
  axios.get(`http://localhost:3000/${path}`).then((response) => {
         dispatch(setter(response.data));
  });
};

export const getCurrentUser = (setter) => (dispatch) => {
  axios.get(`http://localhost:3000/users/current_user`).then((response) => {
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

//update
export const updateDataElement = (obj, path, setter) => dispatch => {
  axios.put(`http://localhost:3000/${path}/${obj.id}`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => dispatch(setter(response.data)))
}

//create
export const postDataElement = (obj, path, setter) => dispatch => {
  axios.post(`http://localhost:3000/${path}`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => dispatch(setter(response.data)))
}

//login
export const login = (obj, setter) => dispatch => {
  axios.post(`http://localhost:3000/auth/sign_in`, obj,{
    "Content-Type": "application/json",
  }).then(response => {
    // axios.defaults.headers.common['Authorization'] = response.headers.authorization;
    // debugger
    window.localStorage.setItem('authorization', response.headers.authorization);
    dispatch(setter(response.data))
    console.log(response)
  })
}

//logout
export const logout = () => dispatch => {
  axios.delete(`http://localhost:3000/users/sign_out`, {
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response =>{
    axios.defaults.headers.common['Authorization'] = null;
  })
}

//registration
export const singup = (obj, setter) => dispatch => {
  axios.post(`http://localhost:3000/auth`, obj,{
    "Content-Type": "application/x-www-form-urlencoded",
  }).then(response => dispatch(setter(response.data)))
}