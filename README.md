# NestJS TypeORM Project

A robust API built with NestJS and TypeORM, implementing best practices and clean architecture principles.

## 🚀 Technologies

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [TypeORM](https://typeorm.io/) - Powerful ORM for TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Advanced open-source database
- [Class Validator](https://github.com/typestack/class-validator) - Decorator-based validation
- [Jest](https://jestjs.io/) - Delightful JavaScript testing framework
- [Docker](https://www.docker.com/) - Container platform
- [Swagger](https://swagger.io/) - API documentation
- [Biome](https://biomejs.dev/) - Fast and reliable linter/formatter

## 🏗️ Architecture

This project follows clean architecture principles, organized for optimal maintainability and scalability. It uses TypeORM for database operations and class-validator for input validation.

## 🛠️ Prerequisites

- Node.js >=20.0.0
- Docker and Docker Compose
- PostgreSQL

## ⚙️ Configuration

1. Clone the repository

```bash
git clone [your-repository-url]
cd nestjs-typeorm
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file (example):

```env
# Database
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=todo-list
NODE_ENV=development
```

## 🚀 Running the Project

1. Start the database with Docker

```bash
docker-compose up -d
```

2. Run TypeORM migrations

```bash
npm run typeorm:run-migrations
```

3. Start the application

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## 📚 API Documentation

After starting the application, visit:

```
http://localhost:3000/api
```

This will open the Swagger documentation where you can explore and test all available endpoints.

## 🔧 TypeORM Commands

```bash
# Generate a new migration
npm run typeorm:generate-migration --name=migration_name

# Create a new empty migration
npm run typeorm:create-migration --name=migration_name

# Run migrations
npm run typeorm:run-migrations

# Revert last migration
npm run typeorm:revert-migrations
```

## 💅 Code Formatting

The project uses Biome for code formatting and linting:

```bash
# Check code formatting
npm run biome:check

# Format code
npm run biome:format
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Project Status

This project is actively maintained and accepting contributions.

## 📜 License

This project is licensed under the UNLICENSED license.

---

Made with ♥ by Diogo Soares
