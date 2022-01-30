import { API_ENDPOINTS } from "../../utils/config";
import { makeRequest } from "../../utils/rest";
import { suspensify } from "../../utils/suspensify";

export const CandidateService = {
  getAllCandidates: function () {
    const url = API_ENDPOINTS.candidates;
    return suspensify(makeRequest.get({ url }));
  },
};
