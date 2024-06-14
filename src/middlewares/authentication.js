const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) return res.sendStatus(403);
    const customer = await Customer.findOne({ email: user.customer.email });
    if (!customer) {
      return res.status(401).json({ message: "User not found!" });
    }
    req.user = customer;
    next();
  });
}

module.exports = authenticateToken;
