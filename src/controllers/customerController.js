const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const Customer = require("../models/customerModel");

async function createCustomer(req, res) {
  const {
    email,
    password,
    nome_completo,
    cpf,
    celular,
    cep,
    endereco,
    bairro,
    cidade,
    complemento,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingCustomer = await Customer.findOne({
    where: { [Op.or]: [{ email }, { cpf }] },
  });

  if (existingCustomer) {
    return res.status(400).json({ error: "Customer already exists" });
  }

  try {
    const customer = await Customer.create({
      email,
      password: hashedPassword,
      nome_completo,
      cpf,
      celular,
      cep,
      endereco,
      bairro,
      cidade,
      complemento,
    });

    delete customer.password;

    const token = jwt.sign(
      { customer: { email } },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1y",
      }
    );

    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createCustomer,
};
