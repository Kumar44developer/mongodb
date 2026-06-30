# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Ensure MongoDB is Running

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas (cloud)** and update `.env` with your connection string.

### Step 3: Start the Server
```bash
npm start
```

You should see:
```
✅ MongoDB connection successful
🚀 Server is running on http://localhost:3019
```

### Step 4: Open in Browser
```
http://localhost:3019
```

### Step 5: Fill and Submit the Form

1. Enter Registration Number (e.g., `2024001`)
2. Enter Full Name
3. Enter Email Address
4. Select Branch
5. Click Submit
6. ✅ Success! Data saved to MongoDB

---

## 📝 File Descriptions

| File | Purpose |
|------|---------|
| `server.js` | Express backend, routes, database connection |
| `form.html` | Form UI and structure |
| `form.css` | Beautiful styling and animations |
| `form.js` | Form validation and submission logic |
| `package.json` | Project dependencies |
| `.env` | Configuration (port, database URL) |

---

## 🐛 Common Issues

**Can't connect to MongoDB?**
- Make sure MongoDB is running: `mongod`
- Check `.env` file for correct connection string

**Port 3019 already in use?**
- Change PORT in `.env` file
- Or kill process: `netstat -ano | findstr :3019` (Windows)

**npm install fails?**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

---

## 🎯 What You Can Do

✅ Fill registration form
✅ Data automatically saves to MongoDB
✅ View all submissions
✅ Form validation (client & server)
✅ Beautiful responsive UI

---

## 📚 API Endpoints

```bash
# Submit form
POST http://localhost:3019/submit-form

# View all submissions
GET http://localhost:3019/get-users

# View single user
GET http://localhost:3019/get-user/:regdNo
```

---

## 💡 Tips

- Form validates before submitting
- Each Registration Number is unique
- All data persists in MongoDB
- Click "Show All Registrations" to see submissions
- Check browser console for errors

---

**Enjoy building!** 🎉

