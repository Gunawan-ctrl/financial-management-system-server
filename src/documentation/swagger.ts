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
    { name: "User", description: "Autentikasi dan manajemen user" },
    { name: "Category", description: "Manajemen kategori" },
    { name: "Transaction", description: "Management transaction" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
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
      TransactionInput: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Transaksi 1" },
        },
      }
    },
  },
  paths: {
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
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Daftar user" },
        },
      },
    },
    "/api/v1/user/{id}": {
      get: {
        tags: ["User"],
        summary: "Ambil user berdasarkan id",
        security: [{ bearerAuth: [] }],
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
        security: [{ bearerAuth: [] }],
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
        security: [{ bearerAuth: [] }],
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
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Daftar kategori" },
        },
      },
      post: {
        tags: ["Category"],
        summary: "Buat kategori baru",
        security: [{ bearerAuth: [] }],
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
        security: [{ bearerAuth: [] }],
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
        security: [{ bearerAuth: [] }],
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
        responses: { 200: { description: "Kategori berhasil diupdate" } },
      },
      delete: {
        tags: ["Category"],
        summary: "Hapus kategori",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Kategori berhasil dihapus" } },
      },
    },
    "/api/v1/transaction": {
      get: {
        tags: ["Transaction"],
        summary: "Ambil semua transaksi",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Daftar transaksi" },
        },
      },
      post: {
        tags: ["Transaction"],
        summary: "Buat transaksi baru",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TransactionInput" },
            },
          },
        },
        responses: {
          201: { description: "Transaksi berhasil dibuat" },
        },
      },
    },
    "/api/v1/transaction/{id}": {
      get: {
        tags: ["Transaction"],
        summary: "Ambil transaksi berdasarkan id",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Data transaksi" },
        },
      },
      put: {
        tags: ["Transaction"],
        summary: "Update transaksi",
        security: [{ bearerAuth: [] }],
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
              schema: { $ref: "#/components/schemas/TransactionInput" },
            },
          },
        },
        responses: { 200: { description: "Transaksi berhasil diupdate" } },
      },
      delete: {
        tags: ["Transaction"],
        summary: "Hapus transaksi",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Transaksi berhasil dihapus" } },
      },
    }
  },
};

export default swaggerDocument;