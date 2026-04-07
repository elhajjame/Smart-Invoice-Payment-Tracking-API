import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import { badRequest, created, notFound, ok } from '../respnses/respons.js'

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

    created(res, newUser, 'the user has been created successfully');

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  };

};

export const login = async (req, res) => {
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

  ok(res, token);
};
