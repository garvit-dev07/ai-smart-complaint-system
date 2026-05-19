# Project Report: AI-Based Smart Complaint Management System

## 1. Title

AI-Based Smart Complaint Management System using MERN Stack

## 2. Problem Statement

This project provides an online complaint management platform where users can securely register complaints, track progress, and receive AI-assisted categorization. The system improves complaint routing by identifying urgency, summarizing issues, generating automatic responses, and recommending the appropriate department.

## 3. Objectives

- Build a complete MERN Stack application
- Implement complaint registration and tracking
- Secure the system with JWT authentication and bcrypt password hashing
- Integrate AI APIs for complaint analysis
- Prepare the project for deployment on Render

## 4. Frontend Modules

### 4.1 Complaint Registration Form

- Inputs: Name, Email, Complaint Title, Complaint Description, Complaint Category, Location, Complaint Status
- On submission, the frontend sends the complaint to the backend API and displays AI results after storage

### 4.2 Complaint List Page

- Displays all complaints for the logged-in user
- Admin can view all complaints
- Supports category filtering and text search

### 4.3 Complaint Status Update Page

- Lets users and admins update complaint status
- Supports tracking and resolution workflow

### 4.4 AI Analysis Result Display

- Shows detected priority
- Shows recommended department
- Shows complaint summary
- Shows auto-generated response

## 5. Backend Modules

### 5.1 Authentication APIs

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### 5.2 Complaint APIs

- `POST /api/complaints`
- `GET /api/complaints`
- `PUT /api/complaints/:id`
- `DELETE /api/complaints/:id`
- `GET /api/complaints/search?location=Ghaziabad`

### 5.3 AI API

- `POST /api/ai/analyze`

## 6. MongoDB Schema

```js
const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  title: String,
  description: String,
  category: String,
  location: String,
  status: {
    type: String,
    default: "Pending"
  },
  priority: String,
  department: String,
  summary: String,
  autoResponse: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

## 7. AI Integration

AI is used for:

- Complaint priority detection
- Department recommendation
- Complaint summary generation
- Auto-generated user response

The application supports OpenRouter API integration. If the API key is unavailable or the request fails, a fallback heuristic engine still generates classification outputs for demonstration and testing.

## 8. Authentication and Security

- JWT token generation on login and signup
- Protected routes on frontend and backend
- bcrypt password hashing before database storage
- Input validation using `express-validator`

## 9. Test Cases

| Test Case | Expected Output |
|---|---|
| Add valid complaint | Complaint stored successfully |
| Missing title field | Validation error |
| Invalid email | Error message |
| Filter by location | Matching complaints displayed |
| Valid login | Token generated |
| Invalid password | Unauthorized error |
| Access without token | Access denied |
| Stored password | Encrypted format |

## 10. Code Output Screenshots

Add the following screenshots here before PDF conversion:

- Signup page
- Login page
- Complaint registration page
- Complaint list page
- Complaint status update page
- AI analysis display

## 11. Postman or Thunder Client Screenshots

Add screenshots for:

- Signup request
- Login request
- Add complaint request
- Get all complaints request
- Update complaint status request
- Search complaint by location request
- AI analyze request

## 12. MongoDB Storage Screenshot

Insert MongoDB Atlas collection screenshot showing stored complaint records and hashed user passwords.

## 13. Render Deployment Screenshot

Add screenshots for:

- Frontend deployed successfully
- Backend deployed successfully
- MongoDB connection working
- Live endpoint testing

## 14. Live Links

- Frontend URL: `Add after deployment`
- Backend API URL: `Add after deployment`
- GitHub Repository Link: `Add after repository upload`

## 15. Conclusion

The Smart Complaint Management System demonstrates how AI can improve municipal or organizational complaint handling through intelligent prioritization, automated replies, and department routing. The project satisfies the MERN, AI, authentication, and deployment requirements described in the examination case study.
