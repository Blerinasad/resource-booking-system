import ApiError from "../utils/ApiError.js";

export const validateCreateResource = (req, res, next) => {
  const { name, type, capacity, location, status } = req.body;

  const validTypes = ["room", "lab", "equipment", "workspace"];
  const validStatuses = ["available", "unavailable", "maintenance"];

  if (!name || !type || !location) {
    return next(new ApiError(400, "Name, type and location are required."));
  }

  if (!validTypes.includes(type)) {
    return next(new ApiError(400, "Invalid resource type."));
  }

  if (status && !validStatuses.includes(status)) {
    return next(new ApiError(400, "Invalid resource status."));
  }

  if (capacity !== undefined && capacity !== null && Number(capacity) < 0) {
    return next(new ApiError(400, "Capacity cannot be negative."));
  }

  next();
};

export const validateUpdateResource = (req, res, next) => {
  const { type, capacity, status } = req.body;

  const validTypes = ["room", "lab", "equipment", "workspace"];
  const validStatuses = ["available", "unavailable", "maintenance"];

  if (type && !validTypes.includes(type)) {
    return next(new ApiError(400, "Invalid resource type."));
  }

  if (status && !validStatuses.includes(status)) {
    return next(new ApiError(400, "Invalid resource status."));
  }

  if (capacity !== undefined && capacity !== null && Number(capacity) < 0) {
    return next(new ApiError(400, "Capacity cannot be negative."));
  }

  next();
};
