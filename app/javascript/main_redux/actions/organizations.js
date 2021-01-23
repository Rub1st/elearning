import {
  CREATE_ORGANIZATION,
  SET_CURRENT_ORGANIZATION,
  GET_ORGANIZATIONS,
  UPDATE_ORGANIZATION,
} from "../constants/organizations";

export const getOrganizations = (organizations) => ({
  type: GET_ORGANIZATIONS,
  value: organizations,
});

export const createOrganization = (newOrganization) => ({
  type: CREATE_ORGANIZATION,
  value: newOrganization,
});

export const setCurrentOrganization = (organizationId) => ({
  type: SET_CURRENT_ORGANIZATION,
  value: organizationId,
});

export const updateOrganization = (organization) => ({
  type: UPDATE_ORGANIZATION,
  value: organization,
});
