import User from "../model/user.model.js";

const users = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      res.status(404).json({
        message: "Users not Found",
      });
    }
    res.status(200).json({
      message: "Users fetched",
      users,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const signup = async (req, res) => {
  try {
    let userData = req.body;

    console.log(userData);

    const user = new User(userData);
    await user.save();

    res.json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    res.send(err.message);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== "string") {
      return res.send("No Scripts allowed!!!");
    }

    const user = await User.findOne({ email: email }).select("+password");

    console.log(user);
    if (!user) {
      res.status(404).json({ message: "User not Found" });
    }
    
    res.send("loging successfull");
  } catch (err) {
    res.send(err.message);
  }
};

const logout = async (req, res) => {
  res.send("Welcome to logout page");
};
const reset = async (req, res) => {
  res.send("Welcome to reset page");
};
const singleUser = async (req, res) => {
  try {
    const id = req.params.id;
    res.send(`Welcome to the user's profile with id : ${id}`);
  } catch (err) {
    res.send(err.message);
  }
};
export { users, signup, login, logout, reset, singleUser };
