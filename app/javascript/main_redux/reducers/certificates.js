import { CREATE_CERTIFICATE,
         GET_CERTIFICATES } from "../constants/certificates";

let initialState = {
  certificates: [],
};

const CertificateReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_CERTIFICATES: {
      return {...state, certificates: action.value}
    }
    case CREATE_CERTIFICATE: {
      return state;
    }
    default:{
      return state;
    }
  }
};

export default CertificateReducer;
