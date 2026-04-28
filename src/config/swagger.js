const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Backend Financial Management System API",
    version: "1.0.0",
    description: "Dokumentasi API untuk backend Financial Management System.",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local development",
    },
  ],
  tags: [
    { name: "Root", description: "Health dan root endpoint" },
    { name: "User", description: "Autentikasi dan manajemen user" },
    { name: "Category", description: "Manajemen kategori" },
    { name: "Stok", description: "Manajemen stok" },
    { name: "Menu", description: "Manajemen menu" },
    { name: "Book", description: "Manajemen buku" },
  ],
  components: {
    schemas: {
      ApiResponse: {
        type: "object",
        properties: {
          code: { type: "number", example: 200 },
          status: { type: "boolean", example: true },
          message: { type: "string", example: "Berhasil Memuat Data" },
          data: {},
        },
      },
      MessageResponse: {
        type: "object",
        properties: {
          code: { type: "number", example: 200 },
          status: { type: "boolean", example: true },
          message: { type: "string", example: "Data berhasil dihapus" },
        },
      },
      UserInput: {
        type: "object",
        required: ["username", "email"],
        properties: {
          username: { type: "string", example: "gunawan" },
          email: { type: "string", format: "email", example: "gunawan@example.com" },
          password: { type: "string", example: "password123" },
          role: { type: "number", example: 2 },
        },
      },
      UserLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "gunawan@example.com" },
          password: { type: "string", example: "password123" },
        },
      },
      CategoryInput: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Minuman" },
          description: { type: "string", example: "Kategori untuk menu minuman" },
        },
      },
      StokInput: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Gula" },
          price: { type: "number", example: 12000 },
          stok: { type: "number", example: 10 },
        },
      },
      MenuInput: {
        type: "object",
        required: ["IDKategori", "name"],
        properties: {
          IDKategori: { type: "string", example: "cat-123" },
          name: { type: "string", example: "Es Kopi Susu" },
          description: { type: "string", example: "Menu kopi susu dingin" },
          price: { type: "string", example: "18000" },
          upload_menu: { type: "string", format: "binary" },
        },
      },
      BookInput: {
        type: "object",
        required: ["IDKategori", "judul"],
        properties: {
          IDKategori: { type: "string", example: "cat-123" },
          judul: { type: "string", example: "Laskar Pelangi" },
          penulis: { type: "string", example: "Andrea Hirata" },
          deskripsi: { type: "string", example: "Novel best seller" },
          penerbit: { type: "string", example: "Bentang" },
          publist_year: { type: "string", example: "2005" },
          cover_buku: { type: "string", format: "binary" },
        },
      },
    },
  },
  paths: {
    "/": {
      get: {
        tags: ["Root"],
        summary: "Root endpoint",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                  example: "Welcome in my server",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/user/register": {
      post: {
        tags: ["User"],
        summary: "Register user baru",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserInput" },
            },
          },
        },
        responses: {
          200: { description: "Response sukses atau gagal registrasi" },
        },
      },
    },
    "/api/v1/user/login": {
      post: {
        tags: ["User"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserLogin" },
            },
          },
        },
        responses: {
          200: { description: "Response login" },
        },
      },
    },
    "/api/v1/user": {
      get: {
        tags: ["User"],
        summary: "Ambil semua user",
        responses: {
          200: { description: "Daftar user" },
        },
      },
    },
    "/api/v1/user/{id}": {
      get: {
        tags: ["User"],
        summary: "Ambil user berdasarkan id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Data user" },
        },
      },
      put: {
        tags: ["User"],
        summary: "Update user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserInput" },
            },
          },
        },
        responses: {
          200: { description: "User berhasil diupdate" },
        },
      },
      delete: {
        tags: ["User"],
        summary: "Hapus user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "User berhasil dihapus" },
        },
      },
    },
    "/api/v1/category": {
      get: {
        tags: ["Category"],
        summary: "Ambil semua kategori",
        responses: {
          200: { description: "Daftar kategori" },
        },
      },
      post: {
        tags: ["Category"],
        summary: "Buat kategori baru",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CategoryInput" },
            },
          },
        },
        responses: {
          201: { description: "Kategori berhasil dibuat" },
        },
      },
    },
    "/api/v1/category/{id}": {
      get: {
        tags: ["Category"],
        summary: "Ambil kategori berdasarkan id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Data kategori" },
        },
      },
      put: {
        tags: ["Category"],
        summary: "Update kategori",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CategoryInput" },
            },
          },
        },
        responses: {
          200: { description: "Kategori berhasil diupdate" },
        },
      },
      delete: {
        tags: ["Category"],
        summary: "Hapus kategori",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Kategori berhasil dihapus" },
        },
      },
    },
    "/api/v1/stok": {
      get: {
        tags: ["Stok"],
        summary: "Ambil semua stok",
        responses: {
          200: { description: "Daftar stok" },
        },
      },
      post: {
        tags: ["Stok"],
        summary: "Buat data stok",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/StokInput" },
            },
          },
        },
        responses: {
          201: { description: "Stok berhasil dibuat" },
        },
      },
    },
    "/api/v1/stok/{id}": {
      get: {
        tags: ["Stok"],
        summary: "Ambil stok berdasarkan id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Data stok" },
        },
      },
      put: {
        tags: ["Stok"],
        summary: "Update stok",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/StokInput" },
            },
          },
        },
        responses: {
          200: { description: "Stok berhasil diupdate" },
        },
      },
      delete: {
        tags: ["Stok"],
        summary: "Hapus stok",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Stok berhasil dihapus" },
        },
      },
    },
    "/api/v1/menu": {
      get: {
        tags: ["Menu"],
        summary: "Ambil semua menu",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", example: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", example: 10 } },
        ],
        responses: {
          200: { description: "Daftar menu" },
        },
      },
      post: {
        tags: ["Menu"],
        summary: "Buat menu baru",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/MenuInput" },
            },
          },
        },
        responses: {
          201: { description: "Menu berhasil dibuat" },
        },
      },
    },
    "/api/v1/menu/category/{id}": {
      get: {
        tags: ["Menu"],
        summary: "Ambil menu berdasarkan kategori",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Data menu per kategori" },
        },
      },
    },
    "/api/v1/menu/{id}": {
      get: {
        tags: ["Menu"],
        summary: "Ambil menu berdasarkan id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Data menu" },
        },
      },
      put: {
        tags: ["Menu"],
        summary: "Update menu",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MenuInput" },
            },
          },
        },
        responses: {
          200: { description: "Menu berhasil diupdate" },
        },
      },
      delete: {
        tags: ["Menu"],
        summary: "Hapus menu",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Menu berhasil dihapus" },
        },
      },
    },
    "/api/v1/book": {
      get: {
        tags: ["Book"],
        summary: "Ambil semua buku",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", example: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", example: 10 } },
        ],
        responses: {
          200: { description: "Daftar buku" },
        },
      },
      post: {
        tags: ["Book"],
        summary: "Buat buku baru",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/BookInput" },
            },
          },
        },
        responses: {
          201: { description: "Buku berhasil dibuat" },
        },
      },
    },
    "/api/v1/book/{id}": {
      get: {
        tags: ["Book"],
        summary: "Ambil buku berdasarkan id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Data buku" },
        },
      },
      put: {
        tags: ["Book"],
        summary: "Update buku",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BookInput" },
            },
          },
        },
        responses: {
          200: { description: "Buku berhasil diupdate" },
        },
      },
      delete: {
        tags: ["Book"],
        summary: "Hapus buku",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Buku berhasil dihapus" },
        },
      },
    },
  },
};

export default swaggerDocument;