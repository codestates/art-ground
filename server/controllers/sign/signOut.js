module.exports = {
  signOut: (req, res) => {
    try {
      res
        .clearCookie("accessToken", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
          domain: "art-ground.link",
        })
        .status(205)
        .json({ message: "successfully signed out!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }
  },
};
