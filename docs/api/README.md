
# API Reference

## Overview

The CyberWhale API provides programmatic access to the platform's features, allowing developers to integrate our services into their applications or build custom extensions. This document details the available endpoints, authentication mechanisms, request/response formats, and best practices.

## Base URL

All API requests should be made to:

```
https://api.cyberwhale.app/v1
```

## Authentication

### Authentication Methods

The API uses JSON Web Tokens (JWT) for authentication. There are two ways to authenticate:

1. **Bearer Token** (recommended):
   ```
   Authorization: Bearer <your_token>
   ```

2. **Query Parameter**:
   ```
   ?token=<your_token>
   ```

### Obtaining an API Token

1. Log in to your CyberWhale account
2. Navigate to Profile Settings > API Access
3. Generate a new API token
4. Set appropriate permissions for the token

### Token Expiration

Tokens expire after 7 days by default. Long-lived tokens can be requested for production applications.

## Rate Limiting

API requests are rate-limited to protect the service from abuse:

- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated requests

Response headers include rate limit information:
- `X-RateLimit-Limit`: Maximum requests allowed in the period
- `X-RateLimit-Remaining`: Requests remaining in the period
- `X-RateLimit-Reset`: Time when the rate limit resets (Unix timestamp)

## Response Format

All responses are returned in JSON format:

```json
{
  "status": "success",
  "data": { ... },
  "meta": {
    "pagination": {
      "total": 100,
      "per_page": 10,
      "current_page": 1,
      "last_page": 10,
      "next_page_url": "https://api.cyberwhale.app/v1/challenges?page=2",
      "prev_page_url": null
    }
  }
}
```

### Error Responses

Errors follow a consistent format:

```json
{
  "status": "error",
  "message": "Detailed error message",
  "code": "ERROR_CODE",
  "errors": [
    {
      "field": "email",
      "message": "Must be a valid email address"
    }
  ]
}
```

## Pagination

Paginated endpoints accept the following parameters:

- `page`: The page number (starting from 1)
- `per_page`: Number of items per page (default: 10, max: 100)

## API Endpoints

### User Management

#### GET /users/me
Retrieves the profile of the authenticated user.

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "user_1234",
    "username": "hackerman",
    "email": "user@example.com",
    "created_at": "2023-01-15T00:00:00Z",
    "profile": {
      "avatar_url": "https://storage.cyberwhale.app/avatars/user_1234.jpg",
      "level": 42,
      "points": 1337,
      "badges": [...]
    }
  }
}
```

#### PUT /users/me
Updates the profile of the authenticated user.

**Request:**
```json
{
  "username": "new_username",
  "avatar_url": "https://example.com/new_avatar.jpg"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "user_1234",
    "username": "new_username",
    "email": "user@example.com",
    "profile": {
      "avatar_url": "https://example.com/new_avatar.jpg",
      ...
    }
  }
}
```

### Challenges

#### GET /challenges
Retrieves a list of available challenges.

**Parameters:**
- `category`: Filter by category (web, crypto, forensics, etc.)
- `difficulty`: Filter by difficulty (beginner, intermediate, expert)
- `status`: Filter by status (active, completed, upcoming)

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "challenge_1",
      "title": "SQL Injection Basics",
      "description": "Learn to exploit SQL injection vulnerabilities",
      "category": "web",
      "difficulty": "beginner",
      "points": 100,
      "completion_rate": 68.5,
      "created_at": "2023-02-15T00:00:00Z"
    },
    ...
  ],
  "meta": {
    "pagination": {
      "total": 50,
      ...
    }
  }
}
```

#### GET /challenges/{id}
Retrieves details for a specific challenge.

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "challenge_1",
    "title": "SQL Injection Basics",
    "description": "Learn to exploit SQL injection vulnerabilities",
    "category": "web",
    "difficulty": "beginner",
    "points": 100,
    "content": {
      "introduction": "SQL injection is a technique...",
      "instructions": "Your goal is to bypass the login...",
      "hints": [
        "Think about how the query is constructed",
        "Try adding quotation marks"
      ]
    },
    "resources": [
      {
        "type": "url",
        "title": "SQL Injection Cheat Sheet",
        "url": "https://example.com/sql-cheatsheet"
      }
    ],
    "environment": {
      "type": "web",
      "url": "https://challenge.cyberwhale.app/challenge_1/"
    },
    "created_at": "2023-02-15T00:00:00Z",
    "updated_at": "2023-03-10T00:00:00Z"
  }
}
```

#### POST /challenges/{id}/attempt
Submit an attempt to solve a challenge.

**Request:**
```json
{
  "flag": "CyberWhale{sql_inj3ction_m4st3r}"
}
```

**Response (success):**
```json
{
  "status": "success",
  "data": {
    "correct": true,
    "points_awarded": 100,
    "message": "Congratulations! You've solved the challenge.",
    "user_stats": {
      "total_points": 1437,
      "completed_challenges": 15
    }
  }
}
```

**Response (failure):**
```json
{
  "status": "success",
  "data": {
    "correct": false,
    "message": "Incorrect flag. Try again!",
    "attempts_remaining": 4
  }
}
```

### Learning Resources

#### GET /courses
Retrieves a list of available courses.

**Parameters:**
- `category`: Filter by category
- `skill_level`: Filter by skill level
- `status`: Filter by enrollment status

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "course_1",
      "title": "Web Security Fundamentals",
      "description": "Learn the basics of web security",
      "category": "web",
      "skill_level": "beginner",
      "duration": "10 hours",
      "modules_count": 5,
      "enrolled_users": 1250,
      "rating": 4.8,
      "image_url": "https://storage.cyberwhale.app/courses/web_security.jpg"
    },
    ...
  ],
  "meta": {
    "pagination": {
      "total": 25,
      ...
    }
  }
}
```

#### GET /courses/{id}
Retrieves details for a specific course.

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "course_1",
    "title": "Web Security Fundamentals",
    "description": "Learn the basics of web security",
    "overview": "This course covers the essential aspects of web security...",
    "category": "web",
    "skill_level": "beginner",
    "prerequisites": [
      "Basic HTML knowledge",
      "Understanding of HTTP"
    ],
    "modules": [
      {
        "id": "module_1",
        "title": "HTTP Security Headers",
        "lessons": [
          {
            "id": "lesson_1",
            "title": "Content Security Policy",
            "duration": "45 minutes",
            "type": "video"
          },
          ...
        ]
      },
      ...
    ],
    "instructors": [
      {
        "id": "user_5678",
        "name": "Jane Smith",
        "title": "Security Researcher",
        "avatar_url": "https://storage.cyberwhale.app/avatars/jane_smith.jpg"
      }
    ],
    "duration": "10 hours",
    "enrolled_users": 1250,
    "rating": 4.8,
    "reviews_count": 350,
    "image_url": "https://storage.cyberwhale.app/courses/web_security.jpg",
    "created_at": "2023-01-10T00:00:00Z",
    "updated_at": "2023-04-15T00:00:00Z"
  }
}
```

### Community

#### GET /forums
Retrieves a list of forum categories and recent discussions.

**Response:**
```json
{
  "status": "success",
  "data": {
    "categories": [
      {
        "id": "cat_1",
        "name": "Web Security",
        "description": "Discussions about web security topics",
        "threads_count": 156,
        "latest_activity": "2023-06-18T14:25:00Z"
      },
      ...
    ],
    "recent_threads": [
      {
        "id": "thread_123",
        "title": "New XSS vulnerability in popular framework",
        "category": "Web Security",
        "author": {
          "id": "user_42",
          "username": "security_wizard",
          "avatar_url": "https://storage.cyberwhale.app/avatars/security_wizard.jpg"
        },
        "replies_count": 28,
        "views_count": 342,
        "created_at": "2023-06-18T12:30:00Z",
        "last_reply_at": "2023-06-18T14:25:00Z"
      },
      ...
    ]
  }
}
```

## Webhooks

CyberWhale supports webhooks for real-time notifications of events within the platform.

### Setting Up Webhooks

1. Navigate to Profile Settings > API Access > Webhooks
2. Add a new webhook URL
3. Select the events you want to subscribe to
4. Save your configuration

### Webhook Events

- `user.registered`: Triggered when a new user registers
- `challenge.completed`: Triggered when a user completes a challenge
- `course.enrolled`: Triggered when a user enrolls in a course
- `course.completed`: Triggered when a user completes a course
- `forum.post_created`: Triggered when a new forum post is created

### Webhook Payload

```json
{
  "event": "challenge.completed",
  "occurred_at": "2023-06-19T08:30:45Z",
  "data": {
    "user_id": "user_1234",
    "challenge_id": "challenge_42",
    "challenge_title": "Advanced XSS Techniques",
    "points_awarded": 250
  }
}
```

## Best Practices

1. **Cache Responses**: Cache API responses when appropriate to reduce load on our servers and improve your application's performance.

2. **Handle Rate Limits**: Implement exponential backoff when approaching rate limits.

3. **Validate Webhooks**: Verify the signature included in webhook headers to ensure the request came from CyberWhale.

4. **Use Appropriate HTTP Methods**: Follow RESTful conventions for HTTP methods (GET, POST, PUT, DELETE).

5. **Error Handling**: Implement robust error handling to gracefully manage API failures.

## Changelog

### v1.2.0 (2023-06-01)
- Added webhooks for real-time event notifications
- Expanded course details endpoint with instructor information
- Improved pagination metadata

### v1.1.0 (2023-03-15)
- Added forum endpoints
- Enhanced challenge submission feedback
- Implemented consistent error formatting

### v1.0.0 (2023-01-01)
- Initial API release
