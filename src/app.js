const express = require("express");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const database = require("./config/database");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);

database.initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
  });
});
