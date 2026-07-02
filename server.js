const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname)));

const mongoURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/students';
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connection successful');
})
.catch((err) => {
  console.log('❌ MongoDB connection error:', err.message);
});

const userSchema = new mongoose.Schema({
  regdNo: {
    type: String,
    required: [true, 'Registration Number is required'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    trim: true
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    enum: ['CSE', 'ECE', 'ME', 'CE', 'EEE']
  },
  createdAt: {  
    type: Date,
    default: Date.now
  }
});

const Users = mongoose.model('User', userSchema);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});


app.post('/submit-form', async (req, res) => {
  try {
    const { regdNo, name, email, branch } = req.body;

    if (!regdNo || !name || !email || !branch) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const existingUser = await Users.findOne({ regdNo });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Registration Number already exists'
      });
    }


    const newUser = new Users({
      regdNo,
      name,
      email,
      branch
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: savedUser
    });


  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error submitting form'
    });
  }
});

app.get('/get-users', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


app.get('/get-user/:regdNo', async (req, res) => {
  try {
    const user = await Users.findOne({ regdNo: req.params.regdNo });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


app.put('/update-user/:regdNo', async (req, res) => {
  try {
    const { regdNo } = req.params;
    const { name, email, branch } = req.body;

    const updatedUser = await Users.findOneAndUpdate(
      { regdNo },
      { name, email, branch },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.delete('/delete-user/:regdNo', async (req, res) => {
  try {
    const { regdNo } = req.params;

    const deletedUser = await Users.findOneAndDelete({ regdNo });

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
