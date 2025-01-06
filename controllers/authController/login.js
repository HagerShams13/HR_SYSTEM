import { User } from "../../models/userModel.js";
import {generateJWT} from '../../utility/generateJWT.js'
import HandleError from '../../middleware/error/errorHandler.js'

const login =HandleError( async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateJWT(user)

    res.status(200).json({ token, user: { id: user._id, username: user.username, role: user.role.name } });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

export default login;