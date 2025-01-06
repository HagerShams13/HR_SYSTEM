import { User } from "../../models/userModel.js";
import { Role } from "../../models/roleModel.js";
import HandleError from '../../middleware/error/errorHandler.js'

const register =HandleError( async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const roleExists = await Role.findOne({ name: role });
    if (!roleExists) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const user = new User({
      username,
      email,
      password,
      role: roleExists._id,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});
export default register;