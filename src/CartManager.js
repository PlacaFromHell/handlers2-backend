import {promises as fs, utimes} from 'fs';
import {nanoid} from "nanoid";
import ProductManager from './productManager.js';

const productGlobal = new ProductManager;

class CartManager {
    constructor() {
        this.path = "./src/carts.json"
    }

    readCarts = async () =>{
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    };

    writeCarts = async (cart) =>{
        await fs.writeFile(this.path, JSON.stringify(cart));
    };

    addCarts = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid(4);
        let cartsConcat = [{id: id, products: [], ...cartsOld}];
        await this.writeCarts(cartsConcat);
        return "Carrito creado satisfactoriamente.";
    };

    exist = async (id) =>{
        let carts = await this.readCarts();
        return carts.find(cart => cart.id===id);
    };

    getCartsById = async (id) =>{
        let cartId = await this.exist(id);
        if (!cartId) return "Fallo de retorno: el carrito solicitado no se encuentra disponible.";
        return cartId;
    };

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId);
        if (!cartById) return "Fallo de retorno: el carrito solicitado no se encuentra disponible.";
        let productById = await productGlobal.exist(productId);
        if (!productById) return "Fallo de retorno: el producto solicitado no se encuentra disponible.";
        let cartsAll = await this.readCarts();
        let cartFilter = cartsAll.filter(cart => cart.id != cartById);

        if (cartById.products.some(prod => prod.id === productById)) {
            let productInCart = cartById.products.find(pord => prod.id === productById);
            productInCart.quantity = productInCart.quantity + 1;
            let cartConcat = [productInCart, ...cartFilter];
            await this.writeCarts(cartConcat);
            return "Producto agregado al carrito de forma satisfactoria."
        }
        cartById.products.push({id: productById.id, quantity: 1});
        let cartConcat = [cartById, ...cartFilter];
        await this.writeCarts(cartConcat);
        return "Producto agregado al carrito de forma satisfactoria."
    };
}

export default CartManager;