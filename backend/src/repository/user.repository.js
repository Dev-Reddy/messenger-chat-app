import User from "../models/user.model.js";

export const findUserEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const findUserByIdWithoutPassword = async (id) => {
  try {
    return await User.findById(id).select("-password");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const registerUser = async (fullName, email, password) => {
  try {
    const newUser = new User({
      fullName,
      email,
      password,
    });

    return newUser.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateProfilePicture = async (userId, newProfilePic) => {
  try {
    return await User.findByIdAndUpdate(
      userId,
      {
        profilePic: newProfilePic,
      },
      {
        new: true,
      }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const findAllExceptUser = async (userId) => {
  try {
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    return filteredUsers;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
