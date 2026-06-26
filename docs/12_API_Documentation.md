# 12. API Documentation

## 1. Introduction

The API (Application Programming Interface) acts as the communication bridge between the frontend and the backend of the NourishBridge platform. All client requests are processed through RESTful APIs, which interact with the MongoDB database and return appropriate responses. The APIs are designed following REST principles to ensure scalability, maintainability, and security.

---

# 2. Purpose

The purpose of the API documentation is to:

* Define all available endpoints.
* Describe request and response formats.
* Explain authentication requirements.
* Standardize communication between frontend and backend.
* Assist developers during implementation and testing.

---

# 3. API Base URL

### Development

```text
http://localhost:5000/api
```

### Production

```text
https://your-domain.com/api
```

---

# 4. Authentication

The system uses **JSON Web Token (JWT)** for secure authentication.

After successful login, the backend returns a JWT token.

Example:

```text
Authorization: Bearer <JWT_TOKEN>
```

Protected APIs require this token in the request header.

---

# 5. Authentication APIs

## Register User

**POST**

```http
/api/auth/register
```

### Request Body

```json
{
  "fullName": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "Donor"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully."
}
```

---

## Login

**POST**

```http
/api/auth/login
```

### Request

```json
{
  "email": "rahul@gmail.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

---

## Logout

**POST**

```http
/api/auth/logout
```

---

# 6. Donation APIs

## Create Donation

**POST**

```http
/api/donations
```

Creates a new food donation.

---

## Get All Donations

**GET**

```http
/api/donations
```

Returns all available food donations.

---

## Get Donation By ID

**GET**

```http
/api/donations/:id
```

---

## Update Donation

**PUT**

```http
/api/donations/:id
```

---

## Delete Donation

**DELETE**

```http
/api/donations/:id
```

---

# 7. NGO APIs

## Get Nearby NGOs

```http
GET /api/ngos
```

---

## Register NGO

```http
POST /api/ngos
```

---

## Accept Donation

```http
PATCH /api/ngos/accept/:donationId
```

---

## Reject Donation

```http
PATCH /api/ngos/reject/:donationId
```

---

# 8. Volunteer APIs

## Register Volunteer

```http
POST /api/volunteers
```

---

## Assign Volunteer

```http
PATCH /api/volunteers/assign/:donationId
```

---

## Update Delivery Status

```http
PATCH /api/volunteers/delivery/:id
```

---

# 9. Notification APIs

## Send Notification

```http
POST /api/notifications
```

---

## Get Notifications

```http
GET /api/notifications
```

---

## Mark Notification as Read

```http
PATCH /api/notifications/:id
```

---

# 10. Admin APIs

## Dashboard

```http
GET /api/admin/dashboard
```

---

## Get All Users

```http
GET /api/admin/users
```

---

## Verify NGO

```http
PATCH /api/admin/verify-ngo/:id
```

---

## Delete User

```http
DELETE /api/admin/users/:id
```

---

# 11. HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

# 12. Error Response Format

```json
{
  "success": false,
  "message": "Invalid request."
}
```

---

# 13. Security Measures

The APIs implement the following security mechanisms:

* JWT Authentication
* Password hashing using bcrypt
* Role-Based Access Control (RBAC)
* Input validation
* CORS protection
* Rate limiting
* Environment variables for secrets

---

# 14. Future API Enhancements

* Real-time notifications using Socket.IO
* Push notifications
* GraphQL support
* API versioning
* Third-party NGO integrations

---

# 15. Conclusion

The API documentation defines the communication layer of the NourishBridge platform. It provides standardized endpoints for authentication, donation management, NGO operations, volunteer assignments, notifications, and administration. These APIs ensure secure, scalable, and efficient interaction between the frontend, backend, and database.
