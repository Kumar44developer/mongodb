# Student Registration Form with MongoDB

A complete full-stack registration form application with HTML, CSS, JavaScript frontend and Node.js/Express backend with MongoDB database integration.

## Features

✅ **Beautiful Responsive Form** - Modern UI with gradient design
✅ **Client-side Validation** - Real-time field validation
✅ **Server-side Validation** - Secure data validation on backend
✅ **MongoDB Integration** - Persistent data storage
✅ **Complete CRUD Operations** - Create, Read, Update, Delete registrations
✅ **View All Submissions** - Display all registered students
✅ **Error Handling** - Comprehensive error management
✅ **RESTful API** - Clean API endpoints

## Project Structure

```
mongodb/
├── server.js           # Express server & MongoDB connection
├── form.html          # HTML form interface
├── form.css           # CSS styling
├── form.js            # Frontend JavaScript & validation
├── package.json       # Dependencies
├── .env              # Environment variables
├── .gitignore        # Git ignore file
└── README.md         # This file


## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or connection string)
- **npm** (comes with Node.js)

## Installation

### 1. Install MongoDB

**Option A: Local Installation**
- Download from: https://www.mongodb.com/try/download/community
- Install and run MongoDB locally on port 27017

**Option B: MongoDB Atlas (Cloud)**
- Create account at: https://www.mongodb.com/cloud/atlas
- Get your connection string
- Update `.env` file with your connection string

### 2. Install Dependencies

```bash
npm install
```

This will install:
- express
- mongoose
- body-parser
- cors
- dotenv

## Configuration

Edit `.env` file to configure:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/students
PORT=3019
NODE_ENV=development
```

**For MongoDB Atlas**, update the URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/students?retryWrites=true&w=majority
```

## Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

Requires: `npm install -g nodemon`

### Production Mode

```bash
npm start
```

## Access the Application

Open your browser and navigate to:
```
http://localhost:3019
```

## API Endpoints

### 1. **Submit Form Data** (Create)
```
POST /submit-form
Content-Type: application/json

{
  "regdNo": "2024001",
  "name": "John Doe",
  "email": "john@example.com",
  "branch": "CSE"
}
```

### 2. **Get All Users** (Read All)
```
GET /get-users
```

### 3. **Get Single User** (Read)
```
GET /get-user/:regdNo
Example: GET /get-user/2024001
```

### 4. **Update User** (Update)
```
PUT /update-user/:regdNo
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "branch": "ECE"
}
```

### 5. **Delete User** (Delete)
```
DELETE /delete-user/:regdNo
Example: DELETE /delete-user/2024001
```

## Form Fields

| Field | Type | Validation |
|-------|------|-----------|
| Registration Number | Text | Required, Unique, Min 3 chars |
| Name | Text | Required, Letters only, Min 3 chars |
| Email | Email | Required, Valid email format |
| Branch | Select | Required, One of: CSE, ECE, ME, CE, EEE |

## Database Schema

```javascript
User Document:
{
  _id: ObjectId,
  regdNo: String (unique),
  name: String,
  email: String,
  branch: String,
  createdAt: Date (auto)
}
```

## Features Explained

### Frontend (form.js)
- Real-time field validation
- Email format validation
- Form submission handling
- Success/error messages
- View all submissions
- XSS protection
- Responsive design

### Backend (server.js)
- Express.js server setup
- MongoDB connection
- Mongoose schema & model
- Input validation
- Error handling
- CRUD operations
- RESTful API endpoints

### Styling (form.css)
- Modern gradient design
- Responsive layout
- Smooth animations
- Custom scrollbar
- Mobile-friendly
- Accessibility features

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running. Start MongoDB service:
- Windows: `mongod` in Command Prompt
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3019
```
**Solution:** Change PORT in `.env` file or kill process using port 3019

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Run `npm install`

### Connection String Issues
- Check MongoDB URI format
- Verify username/password if using MongoDB Atlas
- Ensure IP whitelist if using cloud MongoDB

## Development Tips

1. **Check MongoDB Data**
   ```bash
   # Use MongoDB Compass or mongo CLI
   db.users.find()
   ```

2. **Test API Endpoints**
   - Use Postman or VS Code Thunder Client extension
   - Test each endpoint with sample data

3. **View Server Logs**
   - Watch console output while running
   - Add console.log() for debugging

4. **Clear Database**
   ```bash
   db.users.deleteMany({})
   ```

## Security Considerations

✅ Input validation on both client and server
✅ Email format validation
✅ XSS protection (HTML escaping)
✅ Unique registration numbers
✅ Error messages don't expose sensitive data
✅ CORS enabled for cross-origin requests
✅ Body parser middleware for JSON/form data

## Performance Optimization

- Indexed `regdNo` field for faster queries
- Efficient error handling
- Optimized CSS animations
- Lazy loading of submission data
- Responsive design for all devices

## Future Enhancements

- User authentication & login
- Email verification
- Export data to CSV/Excel
- Search and filtering
- Pagination
- Dashboard with analytics
- Image upload
- Multi-language support

## License

MIT

## Support

For issues or questions, please check:
1. Console logs (browser DevTools & terminal)
2. MongoDB connection
3. .env file configuration
4. Dependencies installation

---

**Happy Coding!** 🚀
