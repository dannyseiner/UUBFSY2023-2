import axios, { AxiosError } from "axios";
import {toast} from "sonner";

export const api = axios.create({
  baseURL: process.env.REACT_APP_IS_MOCK === 'true' ? process.env.REACT_APP_MOCK_API_URL : process.env.REACT_APP_PROD_API_URL,
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 401:
            toast.error("You are not logged in");
            break;
          case 403:
            toast.error("You don't have permission to do this action");
            break;
          case 404:
            toast.error("Error API Route not found");
            break;
          default:
            toast.error(`Unexpected error occurred: ${axiosError.response.status}`);
            break;
        }
      } else {
        toast.error("Network error or no response from server");
      }
    } else {
      toast.error("An unexpected error occurred")
    }
    return Promise.reject(error);
  }
);
