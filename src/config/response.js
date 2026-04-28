const requestResponse = {
  gagal: (message) => ({
    code: 404,
    status: false,
    message,
  }),

  berhasil: (message) => ({
    code: 200,
    status: true,
    message,
  }),

  kesalahan: () => ({
    code: 500,
    status: false,
    message: "Terjadi kesalahan pada server",
  }),

  suksesLogin: (data) => ({
    code: 200,
    status: true,
    message: "Berhasil Login",
    data,
  }),

  suksesWithData: (data) => ({
    code: 200,
    status: true,
    message: "Berhasil Memuat Data",
    data,
  }),
};

export default requestResponse;
