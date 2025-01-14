import {promises as fs} from "fs";

//Actividad 1:

class ProductManager {
    static ultId = 0;
    constructor (path){
        this.products = [];
        this.path = path;

    }

    async addProduct(title, description, price, img, code, stock){

        //Puedo leer el archivo y guardarme el array con los productos:
        const arrayProductos = await this.leerArchivo();

        if(!title || !description || !price || !img || !code || !stock){
            console.log("todos los campos son obligatorios");
            return;
        }

        //Validamos que el codigo sea unico:
        if(arrayProductos.some(item => item.code === code)){
            console.log("el codigo debe ser unico");
            return;
        }
        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title, 
            description,
            price,
            img,
            code,
            stock
        }

        arrayProductos.products.push(nuevoProducto);

        //una ve que agregamos el nuevo producto al array, guardamos el array al archivo:
        await this.guardarArchivo(arrayProductos);

    }

    async getProducts(){
        const arrayProductos = await this.leerArchivo();
        return arrayProductos;
    }

    async getProductById(id){
        const arrayProductos = await this.leerArchivo();
        const producto = arrayProductos.find(item => item.id === id);
        if(!producto){
            return "Not found";
        } else {
            return producto;
        }
    }
//se pueden armar unos metodos auxiliares que guarden el archivo y recuperen los datos

    async guardarArchivo(arrayProductos){
            try{
                await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))
            } catch (error){
                console.log("Tenemos un error al guardar el archivo");
            }
        }
    async leerArchivo(){
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos; 
        } catch (error){
            console.log("Tenemos un error al leer el archivo")
        }
    }    
}

//module.exports = ProductManager;
export default ProductManager;

