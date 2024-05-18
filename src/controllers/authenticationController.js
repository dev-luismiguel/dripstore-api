const { username, password } = req.body;
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path as necessary

// implement db

async function login(req, res) {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1y" });
    return res.json({ message: "Authentication successful!", token });
  } else {
    return res.status(401).json({ message: "Authentication failed!" });
  }
}
