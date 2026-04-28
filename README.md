# Financial Management System Server

Sistem backend untuk manajemen keuangan dengan TypeScript, Express.js, dan MongoDB.

## 📋 Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Tech Stack](#tech-stack)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi](#instalasi)
- [Konfigurasi Lingkungan](#konfigurasi-lingkungan)
- [Menjalankan Proyek](#menjalankan-proyek)
- [Struktur Proyek](#struktur-proyek)
- [API Endpoints](#api-endpoints)
- [Dokumentasi API](#dokumentasi-api)

## 🎯 Tentang Proyek

Financial Management System Server adalah aplikasi backend yang dirancang untuk mengelola data keuangan, kategori, pengguna, dan data terkait lainnya. Dibangun dengan TypeScript untuk memberikan tipe keamanan (type safety) yang kuat dan maintainability yang lebih baik.

### Fitur Utama

- ✅ Sistem autentikasi pengguna (register & login)
- ✅ Manajemen kategori keuangan
- ✅ Keamanan password dengan bcrypt
- ✅ Database MongoDB dengan Mongoose
- ✅ RESTful API dengan dokumentasi Swagger
- ✅ Upload file dengan multer
- ✅ Middleware timeout handling
- ✅ CORS support

## 🛠 Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| **Runtime** | Node.js 22.x |
| **Language** | TypeScript 5.8 |
| **Framework** | Express.js 4.18 |
| **Database** | MongoDB 6.8 + Mongoose |
| **Authentication** | bcrypt 5.1 |
| **File Upload** | multer 1.4 |
| **API Docs** | Swagger UI 5.0 |
| **Dev Tools** | tsx, TypeScript Compiler |

## 💻 Persyaratan Sistem

- Node.js >= 22.x
- MongoDB (local atau cloud instance)
- npm atau yarn
- Terminal/Command Line

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd financial-management-system-server
```

### 2. Install Dependencies

```bash
npm install
```

Atau menggunakan yarn:

```bash
yarn install
```

## ⚙️ Konfigurasi Lingkungan

### 1. Buat File `.env`

Salin dari `.env.example` dan sesuaikan dengan konfigurasi Anda:

```bash
cp .env.example .env
```

### 2. Isi Variabel Lingkungan

Edit file `.env`:

```env
# Port untuk menjalankan server
PORT=4000

# MongoDB Connection String (development)
MONGO_DEV=mongodb://localhost:27017/financial-management

# MongoDB Connection String (production)
# MONGO_PROD=mongodb+srv://username:password@cluster.mongodb.net/financial-management

# Node Environment
NODE_ENV=development

# JWT Secret untuk Bearer Token
JWT_SECRET=change-me-in-production
```

### Contoh Konfigurasi MongoDB

**Local Development:**
```env
MONGO_DEV=mongodb://localhost:27017/financial-management
```

**MongoDB Atlas (Cloud):**
```env
MONGO_DEV=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/financial-management?retryWrites=true&w=majority
```

## ▶️ Menjalankan Proyek

### Development Mode (dengan auto-reload)

```bash
npm run dev
```

Jalankan ini untuk development dengan TypeScript watcher yang otomatis restart server ketika ada perubahan file.

### Production Build

```bash
npm run build
```

Mengkompilasi TypeScript ke JavaScript di folder `dist/`.

### Menjalankan Production Server

```bash
npm start
```

Jalankan server dari compiled JavaScript.

### Testing

```bash
npm test
```

## 📁 Struktur Proyek

```
financial-management-system-server/
├── src/
│   ├── controller/
│   │   ├── user-controller.ts        # Logic handler untuk user
│   │   └── category-controller.ts    # Logic handler untuk category
│   ├── service/
│   │   ├── user-service.ts           # Business logic user
│   │   └── category-service.ts       # Business logic category
│   ├── model/
│   │   ├── user-model.ts             # Mongoose schema user
│   │   └── category-model.ts         # Mongoose schema category
│   ├── routes/
│   │   ├── index.ts                  # Route utama
│   │   ├── user-routes.ts            # Route user
│   │   └── category-routes.ts        # Route category
│   ├── middlewares/
│   │   ├── validateObjectId.ts       # Middleware validasi ObjectId
│   │   └── UploadConfig.ts           # Konfigurasi file upload
│   ├── config/
│   │   ├── dbconfig.ts               # Database connection config
│   │   ├── response.ts               # Response formatter
│   │   └── swagger.ts                # Swagger documentation
│   ├── assets/                       # Folder untuk upload file
│   └── documentation/
│       └── swagger.ts                # API documentation
├── dist/                             # Compiled output (generated)
├── index.ts                          # Application entry point
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Project dependencies
├── .env                              # Environment variables
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
└── README.md                         # Dokumentasi ini
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:4000
```

### User Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/v1/user/register` | Register user baru |
| POST | `/api/v1/user/login` | Login user |
| GET | `/api/v1/user` | Ambil semua user |
| GET | `/api/v1/user/:id` | Ambil user berdasarkan ID |
| PUT | `/api/v1/user/:id` | Update user |
| DELETE | `/api/v1/user/:id` | Hapus user |

Endpoint `GET/PUT/DELETE` pada user membutuhkan Bearer Token.

### Category Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/v1/category` | Buat kategori baru |
| GET | `/api/v1/category` | Ambil semua kategori |
| GET | `/api/v1/category/:id` | Ambil kategori berdasarkan ID |
| PUT | `/api/v1/category/:id` | Update kategori |
| DELETE | `/api/v1/category/:id` | Hapus kategori |

Semua endpoint category membutuhkan Bearer Token.

### Authentication Header

Untuk endpoint yang dilindungi, kirim header berikut:

```http
Authorization: Bearer <token>
```

### Health Check

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/` | Welcome message |

## 📚 Dokumentasi API

Dokumentasi API lengkap tersedia di Swagger UI:

```
http://localhost:4000/api-docs
```

### Contoh Request

#### Register User

```bash
curl -X POST http://localhost:4000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "role": 2
  }'
```

#### Login User

```bash
curl -X POST http://localhost:4000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

Response login akan mengembalikan token JWT pada `data.token`.

#### Akses Endpoint yang Dilindungi

```bash
curl -X GET http://localhost:4000/api/v1/category \
  -H "Authorization: Bearer <token>"
```

#### Buat Kategori

```bash
curl -X POST http://localhost:4000/api/v1/category \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minuman",
    "description": "Kategori untuk menu minuman"
  }'
```

## 🔐 Security Features

- **Password Hashing**: Menggunakan bcrypt untuk keamanan password
- **Timeout Handling**: Request timeout 10 detik untuk mencegah hanging requests
- **CORS**: Cross-Origin Resource Sharing untuk keamanan lintas domain
- **Body Limit**: Batasan ukuran request 20MB
- **Input Validation**: Validasi ObjectId untuk MongoDB

## 📝 Type Safety

Semua file menggunakan TypeScript untuk type safety. Setiap file memiliki tipe lokal yang didefinisikan di bagian atas:

- **Controller**: Memiliki tipe untuk Request params, body, dan Response
- **Service**: Memiliki return type explicit untuk Promise-based operations
- **Model**: Menggunakan Mongoose generics untuk type-safe queries
- **Config**: Tipe untuk response format yang konsisten

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solusi:**
- Pastikan MongoDB running: `mongod` (untuk local)
- Cek connection string di `.env`
- Untuk MongoDB Atlas, pastikan IP address di-whitelist

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::4000
```

**Solusi:**
- Ubah PORT di `.env`
- Atau kill process yang menggunakan port: `lsof -i :4000` (macOS/Linux)

### TypeScript Compilation Error

```bash
npm run build
```

Jika ada error, pastikan:
- Node.js versi 22.x terinstall
- Semua dependencies terinstall: `npm install`

## 📦 Scripts Tersedia

```json
{
  "dev": "tsx watch index.ts",           // Development dengan auto-reload
  "build": "tsc -p tsconfig.json",       // Compile TypeScript
  "start": "node dist/index.js",         // Run production build
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## 🤝 Kontribusi

Untuk berkontribusi:

1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

ISC License - Lihat file LICENSE untuk detail

## 👤 Author

**Gunawan** - Backend Developer

---

## 📞 Support

Untuk bantuan atau pertanyaan, silakan buat issue di repository atau hubungi tim development.

**Server Status**: Siap untuk development dan production

---

**Last Updated**: April 28, 2026
