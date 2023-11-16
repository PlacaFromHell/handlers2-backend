import {Router} from 'express';
import ProductManager from '../productManager.js';

const product = new ProductManager();
const productRouter = Router();

productRouter.get("/", async (req, res) => {
    res.render (
        "home", {"products": await product.getProducts()}
        );
});

productRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await product.getProductsById(id));
});

productRouter.post("/", async (req, res) => {
    let newProduct = req.body;
    res.send (await product.addProducts(newProduct));
});

productRouter.delete("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await product.deleteProducts(id));
});

productRouter.put("/:id", async (req, res) =>{
    let id = req.params.id;
    let updateProduct = req.body;
    res.send(await product.updateProducts(id, updateProduct));
});

export default productRouter;