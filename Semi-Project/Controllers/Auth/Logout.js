exports.Logout = async (req, res) => {
  try {
    // لو فيه سيشن/توكن، هنا المفروض يتلغي
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
