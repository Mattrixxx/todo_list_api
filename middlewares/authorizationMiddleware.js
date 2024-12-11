exports.checkUserAuthorization = (req, res, next) => {
  console.log(req.user)
  const tokenUserId = req.user.userId;

  if (!tokenUserId) {
    const error = new Error("You are not authorized to access this resource.");
    error.status = 403;
    throw error;
  }

  next();
};
