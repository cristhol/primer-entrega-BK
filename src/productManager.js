//Imports
const path = require('path');
const fs = require('fs/promises');

//Path products.json
const pathJson = path.join(`${__dirname}/../db/products.json`);


class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
    }
    //Metodo getProducts para obtener todos los productos
    getProducts = async ()=>{
        try {
            //Productos del archivo products.json
            const content = await fs.readFile(this.path);
            //Verifico si hay productos en el archivo products.json
            if(content.length === 0){
                console.log('Productos no encontrados');
                return content;
            } 
            return JSON.parse(content);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
    //Metodo para agregar un producto
    addProduct = async (product)=>{
        try {
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            // Validacion de datos recibidos
            if (product.id || product.title || product.description || product.price || product.code || product.stock || product.category || product.thumbnails) {
                this.products.push(product);
                console.log(`Product ${product.title} add`);
                await fs.writeFile(pathJson, JSON.stringify(this.products, null, 2));
            } else {
                console.error(`Error: Code repetido. El code ${product.code} ya esta en uso`);
            }
        } catch (error) {
            console.error('Error: No se pudo agregar el producto');
            throw new Error(error);
        }
    };
    //Metodo getProductById para obtener los productos por su id
    getProductById = async (id)=>{
        try {
            let fileProducts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            //Busqueda de producto por id
            let productFound = fileProducts.find(product => product.id === Number(id));
            if(productFound){
                console.log(`Producto co el id:${id} fue encontrado`);
                return productFound;
            }else{
                console.log(`Error: Producto con el id: ${id}, no encontrado`);
            };
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };
    //Metodo para actualizar un producto
    updateProduct = async(id, data) =>{
        try {
            let fileProducts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            let productFoundIndex = fileProducts.findIndex(prod => prod.id === Number(id));
            if(productFoundIndex < 0){
                return `Producto con el id: ${id}, no encontrado`;
            }else{
                fileProducts[productFoundIndex] = {id: id, ...data};
                await fs.writeFile(this.path, JSON.stringify(fileProducts,null,2));
                console.log("Producto actualizado correctamente");
            }
        } catch (error) {
            console.log(`Error: El producto no fue actualizado`);
            throw new Error(error);
        }
    };
    //Metodo para eliminar un producto por su id
    deleteProduct = async (id)=>{
        try {
            if(!id){
                throw new Error('Id perdido');
            }
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const findProducts = products.find(product => product.id == id);
            if(findProducts){
                let index = products.indexOf(findProducts);
                products.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log(`Producto con el Id: ${id} borrado`); 
            }else{
                throw Error (`Producto con el id: ${id} no existe`);
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
};

// Export de la clase ProductManager
module.exports = ProductManager
