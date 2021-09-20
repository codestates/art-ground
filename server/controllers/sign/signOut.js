module.exports = {
  signOut: (req, res) => {
    try {
      res
        .clearCookie("accessToken")
        .status(205)
        .json({ message: "successfully signed out!" });
    } catch {
      res.status(500).json({ message: "server error" });
    }
  },
};
