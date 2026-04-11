import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import userModel from '../Models/userModel.js';

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  //checking for bad request / incomplete fields
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error('Add all required fields!');
  }

  // check if user already exists
  const userExists = userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await userModel.create({
    userName,
    email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user.id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }

});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error('All fields are required.');
  }

  const user = userModel.findOne({ email });

  if (user && await bcrypt.compare(user.password, password)) {
    res.status(200).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user.id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials.');
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { id, userName, email } = await userModel.findById(req.user.id);

  res.json({
    id: id,
    userName,
    email
  });
});

//generate token wrt user ID
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export { registerUser, loginUser, getUser };