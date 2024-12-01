exports.checkUserAuthorization = (req, res, next) => {
  const { userId } = req.params;
  const tokenUserId = req.user.userId;

  if (parseInt(userId) !== tokenUserId) {
    const error = new Error("You are not authorized to access this resource.");
    error.status = 403;
    throw error;
  }

  next();
};
