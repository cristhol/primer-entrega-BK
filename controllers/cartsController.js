//Imports de clases
const ProductManager = require('../src/productManager');
const CartManager = require('../src/cartManager');

//Path
const path = require('path');
const pathProd = path.join(`${__dirname}/../db/products.json`);

//Instancias de las clases
let myCartManager = new CartManager();
let myProductManager= new ProductManager(pathProd);

//Creacion carrito
const createCart = async (req, res)=>{
    const cart = {
        products: []
    }
    myCartManager.addCart(cart);
    res.status(200).send('carrito creado');
};

//Obtengo el carrito por id
const getCartId = async (req, res)=>{
    const cid = req.params.cid;
    const carts = await myCartManager.getCarts();
    console.log('carts', carts);
    let cart = carts.find((c) => c.id === Number(cid));
    if(cart){
        res.status(200).send(cart);
    }else{
        res.status(404).send(`Error: carrito con el id: ${cid} no encontrado`);
    };
};

//Obtengo el producto por id en el carrito seleccionado por id
const getProductsByIdCart = async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    let cart = await myCartManager.getCartById(Number(cid));
    let product = await myProductManager.getProductById(Number(pid));
    const productAdd = {
        id: product.id,
        quantity: 1
    };
    myCartManager.addToCart(cart, productAdd);
    res.status(200).send('Producto agregado al carrito');
};

//Exports de las funciones
module.exports = {
    createCart,
    getCartId,
    getProductsByIdCart};