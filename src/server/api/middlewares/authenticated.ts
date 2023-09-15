const authenticated = (req, res, next): void => {
  if (req.isAuthenticated()) return next();

  return res.sendStatus(401);
};

export default authenticated;
