import { CREATE_REPORT } from "../constants/reports";

let initialState = {
  reports: [],
};

const ReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REPORT: {
      return { ...state, reports: action.value };
    }
    default: {
      return state;
    }
  }
};

export default ReportReducer;
