import { User } from "../schema/user.schema.js";
import ApiError from "../utils/ApiError.js";
import { TryCatch } from "../utils/TryCatch.js";
import bcrypt from "bcryptjs";

export const register = TryCatch(async (req, res, next) => {
  const { email, password, name } = req.body;

  // create hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
  });

  return res.status(201).json({
    success: true,
    user,
    message: "Account Created Successfully",
  });
});

export const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });

  // not found
  if (!user) return next(new ApiError(404, "User not found"));

  // check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new ApiError(400, "Invalid Password"));

  return res.status(200).json({
    success: true,
    message: "Login Successful",
    user,
  });
});

export const logout = TryCatch(async (req, res, next) => {
  const { id } = req.body;

  await User.findByIdAndDelete(id);

  return res.status(200).json({ success: true, message: "Logout Successfully" });
});
