import { CREATE_REPORT } from "../constants/reports";

export const createReport = (reports) => ({
  type: CREATE_REPORT,
  value: reports,
});
