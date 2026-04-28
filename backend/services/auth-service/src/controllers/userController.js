import User from "../models/userModel.js";

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "status", "createdAt"],
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
