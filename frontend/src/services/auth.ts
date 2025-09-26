import { useMutation } from "@tanstack/react-query";
import { publicHttp } from "../lib/http";
import type { AuthUser } from "../types/auth";

export type LoginParams = { email: string; password: string };
export type LoginResponse = { accessToken: string; user: AuthUser };

export async function loginRequest(
  params: LoginParams
): Promise<LoginResponse> {
  const res = await publicHttp.post("/auth/login", params);
  return res.data as LoginResponse;
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: (params: LoginParams) => loginRequest(params),
  });
}
