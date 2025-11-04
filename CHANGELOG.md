# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial release preparation
- Comprehensive documentation
- Docker support
- CI/CD pipeline

## [1.0.0] - 2025-01-XX

### Added

#### Backend

- User authentication with JWT and HTTP-only cookies
- User profile management (update name, email, password)
- URL shortening with nanoid
- Click tracking with atomic increments
- Rate limiting middleware
- Input validation with Zod
- PostgreSQL database with Prisma ORM
- RESTful API endpoints
- Error handling middleware
- CORS configuration

#### Frontend

- Modern glassmorphism UI design
- Purple-pink gradient theme
- Responsive layout for all devices
- User authentication flow (signup, signin, signout)
- URL shortening interface
- Link management dashboard
- User profile editing modal
- Real-time statistics (total links, total clicks)
- Copy to clipboard functionality
- Toast notifications
- Auto-login on page refresh
- Icon component library
- Reusable UI components

#### Features

- Secure password hashing with bcrypt
- Unique username and email validation
- Click analytics
- User dashboard with statistics
- Auto-redirect from short links

### Security

- HTTP-only cookies for JWT tokens
- Password strength validation (minimum 6 characters)
- Input sanitization and validation
- CORS protection
- Rate limiting
- Environment variable protection
- SQL injection prevention (Prisma ORM)

### Documentation

- Comprehensive README
- Contributing guidelines
- Code of conduct
- License (MIT)
- API documentation
- Setup instructions
- Deployment guide

---

## Release Types

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

[Unreleased]: https://github.com/MalloyManga/ShortLinkPractice/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/MalloyManga/ShortLinkPractice/releases/tag/v1.0.0
