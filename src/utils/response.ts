import type { RequestResponse } from "../types/response.ts";

const requestResponse = {
  // ❌ error
  badRequest: (message: string): RequestResponse => ({
    status: 400,
    success: false,
    message,
  }),

  unauthorized: (message: string): RequestResponse => ({
    status: 401,
    success: false,
    message,
  }),

  notFound: (message: string): RequestResponse => ({
    status: 404,
    success: false,
    message,
  }),

  conflict: (message: string): RequestResponse => ({
    status: 409,
    success: false,
    message,
  }),

  internalError: (): RequestResponse => ({
    status: 500,
    success: false,
    message: "Terjadi kesalahan pada server",
  }),

  // ✅ success
  success: (message: string): RequestResponse => ({
    status: 200,
    success: true,
    message,
  }),

  successWithData: <T>(data: T): RequestResponse<T> => ({
    status: 200,
    success: true,
    message: "Berhasil Memuat Data",
    data,
  }),

  created: <T>(data: T): RequestResponse<T> => ({
    status: 201,
    success: true,
    message: "Data berhasil dibuat",
    data,
  }),

  successLogin: <T>(data: T): RequestResponse<T> => ({
    status: 200,
    success: true,
    message: "Berhasil Login",
    data,
  }),
};

export default requestResponse;