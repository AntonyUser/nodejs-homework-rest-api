const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUploadPath, originalname } = req.file;
  const image = await Jimp.read(tempUploadPath);
  image.resize(250, 250);
  image.write(tempUploadPath);
  const { _id } = req.user;

  const newImageName = `${_id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, newImageName);
    await fs.rename(tempUploadPath, resultUpload);
    const avatarURL = path.join("public", "avatars", newImageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUploadPath);
    throw error;
  }
};
module.exports = updateAvatar;
