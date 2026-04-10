import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import { successResponse, errorResponse } from '../respnses/respons.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRED_IN })
};

export const register = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = generateToken(newUser._id);

    successResponse(res, 201, { token, newUser }, 'the user has been created successfully');

  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error')
  };

};

export const login = async (req, res) => {
  try {
    // 1) check the email and password if exist in body
    const { email, password } = req.body

    if (!email || !password) {
      return badRequest(res, 'Email and password are required')
    };

    // check user in database
    const user = await User.findOne({ email }).select('+password');

    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
      return notFound(res, 'incorrect email or password!')
    };

    const token = generateToken(user._id);

    successResponse(res, 200, { token }, 'you are logged-in successfully');

  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error')
  }

};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    successResponse(res, 200, user)
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error');
  }
}