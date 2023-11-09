const UsersService = require("../services/UserService");

const usersService = new UsersService();

async function register(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    const newUser = await usersService.registerUser({
      firstname,
      lastname,
      email,
      password,
    });

    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}

module.exports = register;
