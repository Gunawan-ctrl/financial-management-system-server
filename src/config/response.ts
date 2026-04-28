import type { RequestResponse } from "../types/domain.ts";

const requestResponse = {
  gagal: (message: string): RequestResponse => ({
    code: 404,
    status: false,
    message,
  }),

  berhasil: (message: string): RequestResponse => ({
    code: 200,
    status: true,
    message,
  }),

  kesalahan: (): RequestResponse => ({
    code: 500,
    status: false,
    message: "Terjadi kesalahan pada server",
  }),

  suksesLogin: <T>(data: T): RequestResponse<T> => ({
    code: 200,
    status: true,
    message: "Berhasil Login",
    data,
  }),

  suksesWithData: <T>(data: T): RequestResponse<T> => ({
    code: 200,
    status: true,
    message: "Berhasil Memuat Data",
    data,
  }),
};

export default requestResponse;