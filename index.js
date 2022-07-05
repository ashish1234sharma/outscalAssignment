const express = require('express');
const Connect = require('./configs/db');

const cors = require('cors');


const app = express();
app.use(cors())
app.use(express.json())
const productcontroller=require('./controllers/product.controller.js')

app.use("",productcontroller)








app.listen(8080, async () => {
    await Connect()
    console.log('Server is running on port 8080');
});