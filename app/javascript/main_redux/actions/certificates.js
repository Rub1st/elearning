import {
  CREATE_CERTIFICATE,
  GET_CERTIFICATES,
} from "../constants/certificates";

export const createCertificate = (newCertificate) => ({
  type: CREATE_CERTIFICATE,
  value: newCertificate,
});

export const getCertificates = (certificates) => ({
  type: GET_CERTIFICATES,
  value: certificates,
});
