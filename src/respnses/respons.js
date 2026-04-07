// SUCCESS RESPONSES
export const ok = (res, data = {}, message = "Success") => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const created = (res, data = {}, message = "Resource created") => {
  return res.status(201).json({
    message,
    data,
  });
};

export const noContent = (res, message = "No content") => {
  return res.status(204).json({
    success: true,
    message,
  });
};


// CLIENT ERRORS
export const badRequest = (res, message = "Bad request", errors = null) => {
  return res.status(400).json({
    success: false,
    message,
    errors,
  });
};

export const unauthorized = (res, message = "Unauthorized") => {
  return res.status(401).json({
    success: false,
    message,
  });
};

export const forbidden = (res, message = "Forbidden") => {
  return res.status(403).json({
    success: false,
    message,
  });
};

export const notFound = (res, message = "Resource not found") => {
  return res.status(404).json({
    success: false,
    message,
  });
};






