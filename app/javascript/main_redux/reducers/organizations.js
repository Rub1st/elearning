import {
  CREATE_ORGANIZATION,
  SET_CURRENT_ORGANIZATION,
  GET_ORGANIZATIONS,
  UPDATE_ORGANIZATION,
} from "../constants/organizations";
import { toast } from "react-toastify";
import { notify } from "../../components/utils/helpful_functions";

let initialState = {
  organizations: [],
  currentOrganization: {},
  currentDraftOrganization: {},
};

const OrganizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANIZATIONS: {
      return { ...state, organizations: action.value };
    }
    case CREATE_ORGANIZATION: {
      notify(
        `Заявка на создание организации '${action.value.name}' успешно сформирована!`,
        toast.info
      );
      return {
        ...state,
        organizations: [...state.organizations, action.value],
        currentDraftOrganization: action.value,
      };
    }
    case SET_CURRENT_ORGANIZATION: {
      notify(
        `Открыт режим управления организацией '${
          state.organizations.find((el) => el.id === action.value).name
        }'`,
        toast.info
      );
      return {
        ...state,
        currentOrganization: state.organizations.find(
          (el) => el.id === action.value
        ),
      };
    }
    case UPDATE_ORGANIZATION: {
      notify(
        `Обновления для организации '${action.value.name}' успешно сохранены!`,
        toast.info
      );
      if (action.value.approve_status !== "rejected")
        notify(`Ожидайте одобрения администратором!`, toast.info);

      return {
        ...state,
        organizations: [
          ...state.organizations.filter((el) => el.id !== action.value.id),
          action.value,
        ],
        currentOrganization: action.value,
      };
    }
    default: {
      return state;
    }
  }
};

export default OrganizationReducer;
