const express = require('express')
const productRoutes = require('./routes/productRoutes');

const app = express()
const PORT = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/product', productRoutes)

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`)
})
