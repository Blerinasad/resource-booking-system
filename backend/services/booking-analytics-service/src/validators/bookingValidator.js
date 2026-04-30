import ApiError from "../utils/ApiError.js";

const isValidDate = (value) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

export const validateCreateBooking = (req, res, next) => {
  const { resourceId, startTime, endTime, purpose } = req.body;

  if (!resourceId || !startTime || !endTime) {
    return next(new ApiError(400, "resourceId, startTime and endTime are required."));
  }

  if (!isValidDate(startTime) || !isValidDate(endTime)) {
    return next(new ApiError(400, "startTime and endTime must be valid dates."));
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end <= start) {
    return next(new ApiError(400, "endTime must be after startTime."));
  }

  if (purpose && purpose.length > 255) {
    return next(new ApiError(400, "Purpose cannot be longer than 255 characters."));
  }

  next();
};

export const validateDecision = (req, res, next) => {
  const { decisionNote } = req.body;

  if (decisionNote && decisionNote.length > 1000) {
    return next(new ApiError(400, "Decision note is too long."));
  }

  next();
};
