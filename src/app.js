const express = require("express");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const database = require("./config/database");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./utils/swagger-output.json')

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/authentication", authenticationRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

database.initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
  });
});
