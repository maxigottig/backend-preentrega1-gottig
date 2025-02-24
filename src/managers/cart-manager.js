import {promises as fs} from "fs";

class CartManager {
    constructor(path){
        this.carts = [];
        this.path = path;
        this.ultId = 0;

        //Cargo los carritos almacenados
        this.cargarCarritos();
    }
    async cargarCarritos(){
        try{
            const data =await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if(this.carts.length > 0) {
                this.ultId = Math.max(...this.carts.map(cart => cart.id))

            }
        } catch (error){
            await this.guardarCarritos();
        }
    }

    async guardarCarritos(){
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    //los metodos que piden la consigna:

    async crearCarrito(){
        const nuevoCarrito = {
            id: ++this.ultId,
            products: []
        }

        this.carts.push(nuevoCarrito);

        await this.guardarCarritos();
        return nuevoCarrito;
    }
    
    async getCarritosById(cartId){
        const carrito = this.carts.find(c => c.id === cartId);

        if(!carrito){
            throw new Error ("no existe un carrito con ese ID");
        }

        return carrito;
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1){
        const carrito = await this.getCarritosById(cartId);

        const existeProducto = carrito.products.find(p => p.product === productId);
        if(existeProducto){
            existeProducto.quantity += quantity;
        } else {
            carrito.products.push({product: productId, quantity});
        }
        await this.guardarCarritos();
        return carrito;
    }

}

export default CartManager;