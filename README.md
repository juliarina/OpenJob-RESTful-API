# Open Job API
This project was developed as the final submission for the "Belajar Fundamental Back-End dengan JavaScript" course on Dicoding.

## Features

### Authentication
- User registration
- User login
- JWT access token & refresh token authentication

### User Management
- User profile management

### Documents
- Upload supporting documents

### Companies
- Create and manage company information

### Jobs
- Create, update, delete jobs
- Browse available job listings

### Categories
- Manage job categories

### Applications
- Apply for jobs
- Track job applications

### Bookmarks
- Save jobs for later

### Notifications
- RabbitMQ message queue integration
- Email notifications using Nodemailer

### Performance
- Redis caching support

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Redis
- RabbitMQ
- JWT Authentication
- Joi Validation
- Multer
- Nodemailer

## Project Structure

```text
OpenJob-RESTful-API-v2
│
├── OpenJob-RESTful-API-v2-producer/
│   ├── src/
│   ├── migrations/
│   └── package.json
│
├── OpenJob-RESTful-API-v2-consumer/
│   ├── src/
│   └── package.json
│
└── README.md
```

### Producer
Handles API requests, database operations, caching, and message publishing.

### Consumer
Processes RabbitMQ messages and sends email notifications.

## API Endpoints

### Users

| Method | Endpoint   | Description            |
| ------ | ---------- | ---------------------- |
| POST   | /users     | Register new user      |
| GET    | /users/:id | Get user profile by ID |

### Authentication

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | /authentications | Login                |
| PUT    | /authentications | Refresh access token |
| DELETE | /authentications | Logout               |

### Profile

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| GET    | /profile              | Get logged-in user profile |
| GET    | /profile/applications | Get my applications        |
| GET    | /profile/bookmarks    | Get my bookmarks           |

### Companies

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| GET    | /companies     | List all companies |
| GET    | /companies/:id | Get company detail |
| POST   | /companies     | Create company     |
| PUT    | /companies/:id | Update company     |
| DELETE | /companies/:id | Delete company     |

### Categories

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | /categories     | List all categories |
| GET    | /categories/:id | Get category detail |
| POST   | /categories     | Create category     |
| PUT    | /categories/:id | Update category     |
| DELETE | /categories/:id | Delete category     |

### Jobs

| Method | Endpoint                   | Description      |
| ------ | -------------------------- | ---------------- |
| GET    | /jobs                      | List all jobs    |
| GET    | /jobs/:id                  | Get job detail   |
| GET    | /jobs/company/:companyId   | Jobs by company  |
| GET    | /jobs/category/:categoryId | Jobs by category |
| POST   | /jobs                      | Create job       |
| PUT    | /jobs/:id                  | Update job       |
| DELETE | /jobs/:id                  | Delete job       |

### Applications

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| POST   | /applications              | Apply for job             |
| GET    | /applications              | List all applications     |
| GET    | /applications/:id          | Get application detail    |
| GET    | /applications/user/:userId | Applications by user      |
| GET    | /applications/job/:jobId   | Applications by job       |
| PUT    | /applications/:id          | Update application status |
| DELETE | /applications/:id          | Delete application        |

### Bookmarks

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| POST   | /jobs/:jobId/bookmark     | Create bookmark     |
| GET    | /jobs/:jobId/bookmark/:id | Get bookmark detail |
| DELETE | /jobs/:jobId/bookmark     | Delete bookmark     |
| GET    | /bookmarks                | Get all bookmarks   |

## Prerequisites

Before running the project, make sure you have:

- Node.js
- PostgreSQL
- Redis
- RabbitMQ

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd OpenJob-RESTful-API-v2
```

### 2. Install Dependencies

#### Producer

```bash
cd OpenJob-RESTful-API-v2-producer
npm install
```

#### Consumer

```bash
cd ../OpenJob-RESTful-API-v2-consumer
npm install
```

## Environment Variables

### Producer

Create a `.env` file:

```env
HOST=localhost
PORT=3000

PGUSER=your_database_user
PGHOST=localhost
PGPASSWORD=your_database_password
PGDATABASE=your_database_name
PGPORT=5432

ACCESS_TOKEN_KEY=your_access_token
REFRESH_TOKEN_KEY=your_refresh_token

REDIS_SERVER=localhost

RABBITMQ_SERVER=amqp://localhost
```

### Consumer

Create a `.env` file:

```env
PGUSER=your_database_user
PGHOST=localhost
PGPASSWORD=your_database_password
PGDATABASE=your_database_name
PGPORT=5432

MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_smtp_user
MAIL_PASSWORD=your_smtp_password

RABBITMQ_SERVER=amqp://localhost
```

## Database Migration

Run migrations from the producer directory:

```bash
npm run migrate up
```

## Running the Application

### Start Producer

```bash
npm run start
```

The API will run on:

```text
http://localhost:3000
```

### Start Consumer

```bash
npm run start
```
