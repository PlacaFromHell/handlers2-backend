import {promises as fs, utimes} from 'fs';
import {nanoid} from "nanoid";

class ProductManager {
    constructor() {
        this.path = "./src/products.json"
    }

    addProducts = async (product) =>{
        let productsOld = await this.readProducts();
        product.id = nanoid(5);
        let productAddF = [...productsOld, product];
        await this.writeProducts(productAddF);
        return "Producto cargado."
    };

    getProducts = async () =>{
        return await this.readProducts();
    }

    getProductsById = async (id) =>{
        let productId = await this.exist(id);
        if (!productId) return "Fallo de retorno: el producto solicitado no se encuentra disponible.";
        return productId;
    }

    readProducts = async () =>{
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    };

    writeProducts = async (product) =>{
        await fs.writeFile(this.path, JSON.stringify(product));
    };

    exist = async (id) =>{
        let products = await this.readProducts();
        return products.find(prod => prod.id===id);
    };

    deleteProducts = async (id) =>{
        let products = await this.readProducts();
        let productId = products.some(prod => prod.id===id);
        if (!productId) {
            productFilter = products.filter(prod => prod.id!=id);
            await this.writeProducts(productFilter);
            return "Producto eliminado satisfactoriamente."
        }
        return "Fallo al eliminar: el producto solicitado no se encuentra disponible."
    }

    updateProducts = async (id, product) =>{
        let productId = await this.exist(id);
        if (!productId) return "Fallo al actualizar: el producto solicitado no se encuentra disponible."
        await this.deleteProducts(id);
        let productOld = await this.readProducts();
        let products = [{...product, id : id}, ...productOld];
        await this.writeProducts(products);
        return "Producto actualizado satisfactoriamente."
    }
}

export default ProductManager;

const product = new ProductManager;

