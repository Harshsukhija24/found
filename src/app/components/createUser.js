import Userjob from "../model/Userjob";
import Profile from "../model/Profile";
import Culture from "../model/Culture";
import Preferences from "../model/Preference";
import bcrypt from "bcryptjs";

export async function createUser(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      profileData,
      cultureData,
      preferencesData,
    } = req.body;

    // Create the Userjob
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Userjob({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Use the user's _id as userId for Profile, Culture, and Preferences
    const userId = newUser._id;

    // Create Profile
    const newProfile = new Profile({
      userId,
      ...profileData,
    });
    await newProfile.save();

    // Create Culture
    const newCulture = new Culture({
      userId,
      ...cultureData,
    });
    await newCulture.save();

    // Create Preferences
    const newPreferences = new Preferences({
      userId,
      ...preferencesData,
    });
    await newPreferences.save();

    res
      .status(201)
      .json({ message: "User, Profile, Culture, and Preferences created" });
  } catch (error) {
    console.error("Error creating user and related data:", error);
    res.status(500).json({
      message: "An error occurred while creating user and related data",
    });
  }
}
