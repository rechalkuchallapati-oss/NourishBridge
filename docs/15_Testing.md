# 15. Testing

## 1. Introduction

Testing is an essential phase in the software development lifecycle. It ensures that the NourishBridge platform functions correctly, securely, and efficiently. The objective of testing is to identify defects, verify system functionality, and ensure that all project requirements are met before deployment.

---

# 2. Testing Objectives

The primary objectives of testing are:

* Verify that all functionalities work as expected.
* Identify and fix defects before deployment.
* Ensure secure authentication and authorization.
* Validate data integrity and database operations.
* Improve system reliability and performance.
* Ensure a smooth user experience.

---

# 3. Testing Strategy

The following testing approaches will be used:

* Unit Testing
* Integration Testing
* System Testing
* Functional Testing
* Non-Functional Testing
* User Acceptance Testing (UAT)

---

# 4. Testing Environment

| Component       | Technology                    |
| --------------- | ----------------------------- |
| Frontend        | React.js + Vite               |
| Backend         | Node.js + Express.js          |
| Database        | MongoDB Atlas                 |
| API Testing     | Postman                       |
| Browser Testing | Google Chrome, Microsoft Edge |
| Version Control | Git & GitHub                  |

---

# 5. Functional Testing

The following functionalities will be tested:

* User Registration
* User Login
* Food Donation Creation
* Donation Update
* Donation Deletion
* NGO Registration
* NGO Donation Acceptance
* Volunteer Assignment
* Notification Delivery
* Admin Dashboard
* Profile Management

---

# 6. Non-Functional Testing

The system will also be tested for:

* Performance
* Security
* Scalability
* Reliability
* Responsiveness
* Usability

---

# 7. Test Cases

## Authentication Module

| Test ID | Test Case                      | Expected Result              |
| ------- | ------------------------------ | ---------------------------- |
| TC001   | Register with valid details    | User registered successfully |
| TC002   | Login with valid credentials   | Login successful             |
| TC003   | Login with incorrect password  | Error message displayed      |
| TC004   | Access dashboard without login | Access denied                |

---

## Food Donation Module

| Test ID | Test Case                       | Expected Result               |
| ------- | ------------------------------- | ----------------------------- |
| TC005   | Create food donation            | Donation created successfully |
| TC006   | Submit incomplete donation form | Validation error displayed    |
| TC007   | Upload food image               | Image uploaded successfully   |
| TC008   | View donation history           | Donation list displayed       |

---

## NGO Module

| Test ID | Test Case        | Expected Result             |
| ------- | ---------------- | --------------------------- |
| TC009   | NGO registration | Registration completed      |
| TC010   | Accept donation  | Donation status updated     |
| TC011   | Reject donation  | Donation marked as rejected |

---

## Volunteer Module

| Test ID | Test Case              | Expected Result              |
| ------- | ---------------------- | ---------------------------- |
| TC012   | Assign volunteer       | Assignment successful        |
| TC013   | Update delivery status | Status updated successfully  |
| TC014   | Complete delivery      | Delivery marked as completed |

---

## Admin Module

| Test ID | Test Case   | Expected Result            |
| ------- | ----------- | -------------------------- |
| TC015   | View users  | User list displayed        |
| TC016   | Verify NGO  | NGO verification completed |
| TC017   | Delete user | User removed successfully  |

---

# 8. Performance Testing

The application will be evaluated for:

* API response time
* Database query performance
* Image upload speed
* Page load time
* Concurrent user handling

Target Performance:

* API Response Time: Less than 2 seconds
* Homepage Load Time: Less than 3 seconds

---

# 9. Security Testing

Security checks include:

* JWT Authentication
* Password hashing using bcrypt
* Role-Based Access Control (RBAC)
* Input validation
* Protection against unauthorized access
* Secure API endpoints
* Environment variable protection

---

# 10. User Acceptance Testing (UAT)

Before deployment, the application will be tested by representative users to ensure that it meets functional and usability expectations.

Users involved:

* Food Donors
* NGO Representatives
* Volunteers
* Administrator

---

# 11. Bug Reporting

Identified bugs will be documented with:

* Bug ID
* Module
* Description
* Severity
* Steps to Reproduce
* Expected Result
* Actual Result
* Status

---

# 12. Testing Tools

The following tools will be used:

* Postman (API Testing)
* Chrome Developer Tools
* MongoDB Compass
* GitHub Issues (Bug Tracking)
* VS Code Debugger

---

# 13. Expected Outcomes

The testing process should ensure:

* Stable application behavior.
* Accurate database operations.
* Secure authentication.
* Responsive user interface.
* Reliable food donation workflow.
* Successful integration between frontend and backend.

---

# 14. Conclusion

The testing phase ensures that the NourishBridge platform is reliable, secure, and user-friendly. By conducting comprehensive functional, non-functional, security, and acceptance testing, the application can be deployed with confidence while providing a smooth experience for donors, NGOs, volunteers, and administrators.
