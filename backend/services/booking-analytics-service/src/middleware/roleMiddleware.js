import ApiError from "../utils/ApiError.js";

const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "User not authenticated."));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "You do not have permission."));
    }

    next();
  };
};

export default roleMiddleware;
