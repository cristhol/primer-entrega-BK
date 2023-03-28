//Imports
const express = require ('express');
const app = express();

//Port
const port = 8080;

//Imports Routes
const productsRouter = require('./routes/productsRouter.js');
const cartsRouter = require('./routes/cartsRouter.js');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Listen server
app.listen (port, ()=> console.log(`Escuchando servidor en puerto: ${port}`));