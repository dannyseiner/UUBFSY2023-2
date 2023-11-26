import { useMutation, UseMutationResult } from 'react-query';
import { api } from "../index";

interface Credentials {
  name: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

async function loginUser(credentials: Credentials): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/login', credentials);
  return response.data;
}

export function useLogin(): UseMutationResult<LoginResponse, unknown, Credentials> {
  return useMutation(loginUser);
}
