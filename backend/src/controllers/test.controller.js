const testAPI = (req, res) => {
  res.status(200).json({
    message: "Backend is running successfully 🎉",
  });
};

module.exports = { testAPI };
