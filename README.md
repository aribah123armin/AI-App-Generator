**AI App Generator Backend**

A dynamic backend system built with Node.js, Express, and MongoDB that supports automatically generated APIs, authentication, and user-scoped CRUD operations based on configuration-driven schemas.

Live Backend

👉 https://ai-app-generator-2rb0.onrender.com

**FEATURES**:

**Dynamic API Generation**:
Automatically generates MongoDB models from a configuration file
Creates CRUD endpoints without manually writing routes

**Authentication System**:
User registration and login system
Password hashing using bcryptjs
Secure authentication using JWT tokens

**CRUD Operations**:
Full Create, Read, Update, Delete support
User-scoped data (each user sees only their own data)

**Schema-Driven Architecture**:
Models generated dynamically from:
config/appConfig.json
Flexible field definitions

**Middleware System**:
Authentication middleware for protected routes
Validation middleware for entity checks
Centralized error handling

**Tech Stack**:
Node.js
Express.js
MongoDB (Mongoose)
JWT (Authentication)
bcryptjs (Password hashing)
dotenv (Environment variables)
Render (Deployment)

**Project Structure**:

AI-App-Generator/
│
├── src/
│   ├── index.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dynamicRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── validateEntity.js
│   ├── runtime/
│   │   ├── modelRegistry.js
│   │   ├── schemaGenerator.js
│
├── config/
│   ├── appConfig.json
│
├── models/
│   ├── User.js
│
├── .env
├── package.json
└── README.md

**Configuration System**:

All dynamic models are generated from:

config/appConfig.json

Example:

{
  "entities": [
    {
      "name": "tasks",
      "fields": [
        {
          "name": "title",
          "type": "string",
          "required": true
        },
        {
          "name": "completed",
          "type": "boolean",
          "required": false
        }
      ]
    }
  ]
}
API Endpoints
Authentication
Register User
POST /auth/register

Body:

{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
Login User
POST /auth/login

Response:

{
  "token": "JWT_TOKEN"
}

Dynamic CRUD APIs

All APIs are generated from appConfig.json.

For example: tasks entity

Create Task
POST /api/tasks

Headers:

Authorization: Bearer <token>

Body:

{
  "title": "My Task",
  "completed": false
}
Get All Tasks
GET /api/tasks
Update Task
PUT /api/tasks/:id
Delete Task
DELETE /api/tasks/:id

**Authentication Flow**
Register user
Login user
Receive JWT token
Use token in headers:
Authorization: Bearer <token>

**Error Handling**:
The system handles:

Missing fields
Invalid credentials
Duplicate users
Invalid tokens
Schema validation errors

Example response:

{
  "error": "User already exists"
}

**Edge Cases Covered**:
Empty request body handling
Duplicate user prevention
Unauthorized access protection
Invalid JWT handling
Schema mismatch validation
 
**Key Design Highlights**:
Fully dynamic backend architecture
Schema-driven API generation
Modular route system
Middleware-based validation pipeline
Scalable structure for adding new entities

**Deployment**:

Deployed using **Render**
Auto deployment from GitHub
Environment variables configured:
MONGO_URI
JWT_SECRET

**Future Improvements**
Role-based access control (RBAC)
Advanced validation schemas
API rate limiting
Logging system
Swagger/OpenAPI documentation


**Built as part of Backend Engineering project focusing on:
**
API architecture
Dynamic schema systems
Authentication systems
Scalable backend design
