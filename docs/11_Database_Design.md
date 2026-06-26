# 11. Database Design

## 1. Introduction

The database is the core component of the NourishBridge platform. It stores information related to users, NGOs, food donations, volunteers, notifications, reviews, and delivery tracking. MongoDB Atlas is used as the cloud database due to its scalability, flexibility, and support for JSON-based document storage.

---

# 2. Purpose

The purpose of the database design is to:

* Store application data securely.
* Reduce data redundancy.
* Maintain data consistency.
* Improve query performance.
* Support future scalability.
* Enable efficient food donation tracking.

---

# 3. Database Technology

**Database:** MongoDB Atlas

**ODM:** Mongoose

**Database Type:** NoSQL Document Database

**Data Format:** BSON (Binary JSON)

---

# 4. Database Collections

The NourishBridge database consists of the following collections:

1. Users
2. NGOs
3. Donations
4. Food Items
5. Volunteers
6. Donation Assignments
7. Delivery Tracking
8. Notifications
9. Reviews
10. Admins

---

# 5. Collection Design

## 5.1 Users Collection

| Field        | Type     | Required | Description                     |
| ------------ | -------- | -------- | ------------------------------- |
| _id          | ObjectId | Yes      | Primary Key                     |
| fullName     | String   | Yes      | User Name                       |
| email        | String   | Yes      | Unique Email Address            |
| password     | String   | Yes      | Encrypted Password              |
| phone        | String   | Yes      | Contact Number                  |
| role         | String   | Yes      | Donor / NGO / Volunteer / Admin |
| profileImage | String   | No       | User Profile Image              |
| address      | String   | Yes      | User Address                    |
| createdAt    | Date     | Yes      | Registration Date               |

---

## 5.2 NGOs Collection

| Field              | Type     |
| ------------------ | -------- |
| _id                | ObjectId |
| userId             | ObjectId |
| ngoName            | String   |
| registrationNumber | String   |
| address            | String   |
| city               | String   |
| state              | String   |
| pincode            | Number   |
| verificationStatus | Boolean  |

---

## 5.3 Donations Collection

| Field          | Type     |
| -------------- | -------- |
| _id            | ObjectId |
| donorId        | ObjectId |
| ngoId          | ObjectId |
| foodType       | String   |
| quantity       | Number   |
| quantityUnit   | String   |
| expiryTime     | Date     |
| pickupAddress  | String   |
| pickupLocation | GeoJSON  |
| donationStatus | String   |
| foodImage      | String   |
| createdAt      | Date     |

---

## 5.4 Food Items Collection

| Field      | Type     |
| ---------- | -------- |
| _id        | ObjectId |
| donationId | ObjectId |
| itemName   | String   |
| category   | String   |
| quantity   | Number   |
| notes      | String   |

---

## 5.5 Volunteers Collection

| Field           | Type     |
| --------------- | -------- |
| _id             | ObjectId |
| userId          | ObjectId |
| vehicleType     | String   |
| availability    | Boolean  |
| currentLocation | GeoJSON  |

---

## 5.6 Donation Assignment Collection

| Field          | Type     |
| -------------- | -------- |
| _id            | ObjectId |
| donationId     | ObjectId |
| volunteerId    | ObjectId |
| assignedAt     | Date     |
| deliveryStatus | String   |

---

## 5.7 Delivery Tracking Collection

| Field           | Type     |
| --------------- | -------- |
| _id             | ObjectId |
| assignmentId    | ObjectId |
| currentLocation | GeoJSON  |
| updatedAt       | Date     |

---

## 5.8 Notifications Collection

| Field     | Type     |
| --------- | -------- |
| _id       | ObjectId |
| userId    | ObjectId |
| title     | String   |
| message   | String   |
| isRead    | Boolean  |
| createdAt | Date     |

---

## 5.9 Reviews Collection

| Field      | Type     |
| ---------- | -------- |
| _id        | ObjectId |
| donationId | ObjectId |
| reviewerId | ObjectId |
| rating     | Number   |
| comment    | String   |
| createdAt  | Date     |

---

## 5.10 Admin Collection

| Field     | Type     |
| --------- | -------- |
| _id       | ObjectId |
| userId    | ObjectId |
| createdAt | Date     |

---

# 6. Relationships

* One User can create multiple Donations.
* One NGO can receive multiple Donations.
* One Donation contains multiple Food Items.
* One Volunteer can handle multiple Donation Assignments.
* One Donation Assignment has one Delivery Tracking record.
* One User can receive multiple Notifications.
* One Donation can receive multiple Reviews.

---

# 7. Database Indexing

To improve performance, the following indexes are recommended:

* Email (Unique Index)
* Phone Number
* User Role
* Donation Status
* Pickup Location (GeoSpatial Index)
* NGO Location (GeoSpatial Index)

---

# 8. Data Validation Rules

The following validation rules are applied:

* Email must be unique.
* Password must be encrypted.
* Food quantity cannot be negative.
* Expiry time must be a future date.
* NGO registration number must be unique.
* Phone number must contain valid digits.
* Required fields cannot be empty.

---

# 9. Sample Document

### Users Collection Example

```json
{
  "_id": "687a12...",
  "fullName": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "phone": "9876543210",
  "role": "Donor",
  "address": "Hyderabad",
  "createdAt": "2026-06-26"
}
```

---

# 10. Security Considerations

* Passwords are stored using bcrypt hashing.
* JWT authentication protects user sessions.
* Role-Based Access Control (RBAC) restricts access.
* MongoDB Atlas network security is enabled.
* Sensitive data is never exposed through APIs.

---

# 11. Advantages of the Database Design

* Highly scalable.
* Flexible document structure.
* Fast query performance.
* Easy integration with Mongoose.
* Supports geospatial queries.
* Suitable for cloud deployment.

---

# 12. Conclusion

The database design provides a scalable, secure, and efficient foundation for the NourishBridge platform. The defined collections, relationships, validation rules, and indexing strategies ensure reliable storage and retrieval of food donation data while supporting future enhancements and high system performance.

