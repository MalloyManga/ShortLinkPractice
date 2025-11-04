# 🔗 ShortLink - Modern URL Shortener

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Nuxt](https://img.shields.io/badge/Nuxt-4.1.2-00DC82.svg)
![Express](https://img.shields.io/badge/Express-5.1.0-000000.svg)

A full-stack URL shortener built with modern web technologies, featuring a beautiful glassmorphism UI and robust backend.

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## ✨ Features

### 🎨 Frontend

- **Modern UI Design**: Beautiful purple-pink gradient theme with glassmorphism effects
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Statistics**: View total links and click counts instantly
- **User Management**: Secure authentication with profile editing
- **Copy to Clipboard**: One-click copy functionality with toast notifications
- **Dark Theme**: Eye-friendly dark mode design

### ⚡ Backend

- **RESTful API**: Clean and well-documented API endpoints
- **JWT Authentication**: Secure token-based authentication with HTTP-only cookies
- **Click Tracking**: Automatic click counting with atomic database operations
- **Rate Limiting**: Prevent abuse with built-in rate limiting
- **Input Validation**: Robust validation using Zod schemas
- **Error Handling**: Comprehensive error handling middleware
- **Password Security**: bcrypt hashing with salt rounds

### 🛠️ Tech Stack

#### Frontend

- **Nuxt 4.1.2** - The Intuitive Vue Framework
- **Vue 3.5.21** - Progressive JavaScript Framework
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

#### Backend

- **Express 5.1.0** - Fast, minimalist web framework
- **Prisma 6.16.2** - Next-generation ORM
- **PostgreSQL** - Powerful, open-source database
- **Jose** - JWT library for Node.js
- **Zod 4.1.12** - TypeScript-first schema validation

## 📸 Demo

> Add screenshots or GIF demo here

## 🚀 Installation

### Prerequisites

- Node.js >= 18.0.0
- npm or pnpm
- PostgreSQL database (or use Supabase)

### 1. Clone the repository

```bash
git clone https://github.com/MalloyManga/ShortLinkPractice.git
cd ShortLinkPractice
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Configure your `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/shortlink"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
NODE_ENV=development
```

Run Prisma migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3001`

## 📖 Usage

### Creating a Short Link

1. Navigate to the homepage
2. Sign up or sign in to your account
3. Paste your long URL in the input field
4. Click "Shorten URL"
5. Copy your shortened link and share it!

### User Profile Management

- **Update Username**: Change your display name
- **Update Email**: Update your email address
- **Change Password**: Securely update your password
- **View Statistics**: See your total links and clicks

## 🔌 API Documentation

### Authentication Endpoints

#### Sign Up

```http
POST /users/signup
Content-Type: application/json

{
  "name": "username",
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Sign In

```http
POST /users/signin
Content-Type: application/json

{
  "emailOrName": "user@example.com",
  "password": "securepassword"
}
```

#### Sign Out

```http
POST /users/signout
```

#### Get User Profile

```http
GET /users/profile
Authorization: Cookie (auth_token)
```

#### Update User Profile

```http
PUT /users/profile
Authorization: Cookie (auth_token)
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "name": "newusername",
  "email": "newemail@example.com",
  "newPassword": "newpassword"
}
```

### Link Endpoints

#### Create Short Link

```http
POST /links
Authorization: Cookie (auth_token)
Content-Type: application/json

{
  "originLink": "https://example.com/very/long/url"
}
```

#### Get All Links

```http
GET /links
Authorization: Cookie (auth_token)
```

#### Redirect to Original URL

```http
GET /:shortLink
```

## 🗂️ Project Structure

```
ShortLinkPractice/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Express middleware
│   │   ├── routes/            # API routes
│   │   ├── schemas/           # Zod validation schemas
│   │   ├── utils/             # Utility functions
│   │   ├── prisma/            # Prisma client
│   │   ├── app.js             # Express app setup
│   │   └── server.js          # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # Database migrations
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── components/        # Vue components
│   │   ├── composables/       # Vue composables
│   │   ├── layouts/           # Nuxt layouts
│   │   ├── pages/             # Nuxt pages
│   │   ├── plugins/           # Nuxt plugins
│   │   └── assets/            # Static assets
│   ├── nuxt.config.ts         # Nuxt configuration
│   └── package.json
│
├── LICENSE                    # MIT License
└── README.md                  # This file
```

## 🔧 Configuration

### Backend Environment Variables

| Variable       | Description                          | Default     |
| -------------- | ------------------------------------ | ----------- |
| `DATABASE_URL` | PostgreSQL connection string         | Required    |
| `JWT_SECRET`   | Secret key for JWT signing           | Required    |
| `PORT`         | Backend server port                  | 3000        |
| `NODE_ENV`     | Environment (development/production) | development |

### Frontend Configuration

Edit `nuxt.config.ts` to change:

- Server port (default: 3001)
- API base URL
- Build settings

## 🛡️ Security Features

- ✅ HTTP-only cookies for JWT tokens
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Input validation with Zod
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration
- ✅ Environment variable protection
- ✅ SQL injection prevention (Prisma ORM)

## 🚧 Known Issues

- [ ] Profile update password validation (being investigated)
- [ ] Error messages display improvements

See [Issues](https://github.com/MalloyManga/ShortLinkPractice/issues) for more details.

## 🗺️ Roadmap

- [ ] Add link expiration dates
- [ ] Custom short link slugs
- [ ] QR code generation
- [ ] Analytics dashboard
- [ ] Link categories/tags
- [ ] Bulk link creation
- [ ] API rate limiting per user
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social media sharing

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**MalloyManga**

- GitHub: [@MalloyManga](https://github.com/MalloyManga)
- Repository: [ShortLinkPractice](https://github.com/MalloyManga/ShortLinkPractice)

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/) - The Vue Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [Express](https://expressjs.com/) - Web framework

## 📮 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/MalloyManga/ShortLinkPractice/issues) page
2. Create a new issue if your problem isn't listed
3. Star ⭐ the project if you find it useful!

---

<div align="center">

Made with ❤️ by [MalloyManga](https://github.com/MalloyManga)

</div>
