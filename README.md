
# BOOKSLIB API

BOOKSLIB is a robust RESTful API for managing a digital library, built with TypeScript, Express, Zod, Knex, and SQLite. It supports secure user authentication, role-based authorization, and comprehensive CRUD operations for books, with advanced validation and error handling.

---

## Architecture

- **Layered Structure**: Organized into controllers, services, repositories, models, middlewares, and validators for maintainability and scalability.
- **Type Safety**: TypeScript is used throughout for strong typing and reliability.
- **Validation**: Zod schemas ensure all incoming data is validated.
- **Database**: Knex as query builder, SQLite as the database engine. Migrations provided for schema management.

---

## Features

- **User Management**:
    - Registration with name, username (lowercase, no spaces), email, age, password, and role (reader/publisher).
    - Role can be changed later.
    - Secure password hashing (bcryptjs).
    - JWT-based authentication and refresh tokens.
- **Book Management**:
    - CRUD operations for books.
    - Each book includes title, author, genre, recommended age, summary, published date, and publisher reference.
    - Only publishers can create, update, or delete their own books.
    - Readers can view/search books, with age filtering.
- **Search & Pagination**:
    - Search books by author or title.
    - Pagination: GET `/books` returns 10 books per page.
- **Security**:
    - Role-based access control (middleware).
    - Input validation (Zod).
    - Error handling (custom AppError, global error handler).
    - Secure cookies for refresh tokens.
- **Environment Configuration**:
    - Uses dotenv and Zod to validate environment variables.

---

## Database Schema

### Users Table

| Field          | Type    | Description                       |
|----------------|---------|-----------------------------------|
| id             | uuid    | Primary key                       |
| name           | string  | User's full name                  |
| username       | string  | Unique, lowercase, no spaces      |
| email          | string  | Unique email address              |
| hashedPassword | string  | Hashed password                   |
| age            | integer | User's age                        |
| role           | enum    | 'reader' or 'publisher'           |
| created_at     | date    | Registration date                 |

### Books Table

| Field        | Type    | Description                       |
|--------------|---------|-----------------------------------|
| id           | string  | Primary key                       |
| title        | string  | Book title                        |
| genre        | string  | Book genre                        |
| ageRating    | integer | Recommended reading age           |
| resume       | text    | Book summary                      |
| author       | string  | Author name                       |
| publishedDate| date    | Publication date                  |
| publisherId  | string  | Foreign key to Users (publisher)  |
| created_at   | date    | Creation date                     |

**Relationships**:
- Each book is linked to a publisher via `publisherId`.
- Cascade delete: If a publisher is deleted, their books are deleted.

---

## API Endpoints

### Authentication & User

- `POST /users` — Register a new user
- `POST /login` — Authenticate and receive JWT
- `POST /refresh` — Refresh JWT token
- `PATCH /users/:userId/role` — Change user role

### Books

- `POST /books` — Create a new book (publisher only)
- `GET /books` — List all books (age filter, paginated)
- `GET /books/search/name/:title` — Search books by title
- `GET /books/search/author/:author` — Search books by author
- `PUT /books/:id` — Update a book (publisher only, only own books)
- `DELETE /books/:id` — Delete a book (publisher only, only own books)

---

## Validation & Error Handling

- All requests are validated using Zod schemas.
- Custom error handler returns meaningful error messages and codes.
- Handles edge cases: invalid parameters, unauthorized access, not found, duplicate entries.

---

## Security

- Passwords are hashed with bcryptjs.
- JWT tokens for authentication and refresh.
- Role-based access enforced via middleware.
- Secure cookies for refresh tokens.

---

## Setup & Usage

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Configure environment**: Copy `.env.example` to `.env` and set variables.
4. **Run migrations**: `npm run knex migrate:latest`
5. **Start development server**: `npm run dev`
6. **API available at**: `http://localhost:3030`

---

## Testing

- Unit and integration tests can be run with `npm test`.
- Coverage and E2E tests are supported.

---

## Contribution

- Follow TypeScript and ESLint guidelines.
- All new features should include tests and documentation.

---

## License

ISC

---

## Author

OTAIMER

---