import { getCookie } from "@/services/auth/tokenHandler";

export const serverHelper = async (
  endpoint: string,
  options: RequestInit,
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}${endpoint}`,
    {
      headers: {
        ...headers,
        Cookie: accessToken ? `accessToken=${accessToken}` : "",
      },
      ...restOptions,
    },
  );

  return response;
};

export const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    await serverHelper(endpoint, { ...options, method: "GET" }),
  post: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    await serverHelper(endpoint, { ...options, method: "POST" }),
  patch: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    await serverHelper(endpoint, { ...options, method: "PATCH" }),
  delete: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    await serverHelper(endpoint, { ...options, method: "DELETE" }),
};
