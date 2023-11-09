const AuthService = require("../services/AuthService");
const jwtSecret = "secret-key";
const authService = new AuthService(jwtSecret);

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const token = await authService.loginUser(email, password);

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}
module.exports = login;
