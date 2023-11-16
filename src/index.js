import express from 'express';
import productRouter from './router/products.routes.js';
import cartRouter from './router/products.routes.js';
import engine from 'express-handlebars';
import _dirname from './utils.js';
import * as path from 'path';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () =>{

});

