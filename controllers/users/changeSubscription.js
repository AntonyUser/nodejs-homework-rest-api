const { User } = require("../../models");

const changeSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    code: 200,
    message: "subscription updated",
    data: {
      result,
    },
  });
};

module.exports = changeSubscription;
