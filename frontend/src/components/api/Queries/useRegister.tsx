import { useMutation, UseMutationResult } from 'react-query';
import { api } from "../index";

interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

async function registerUser(credentials: Credentials): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/api/register', credentials);
  return response.data;
}

export function useRegister(): UseMutationResult<LoginResponse, unknown, Credentials> {
  return useMutation(registerUser);
}
