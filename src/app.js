import express from "express";
const app = express();
const PUERTO = 3000;
//const productRouter = require("./routes/product.router.js")
import cartRouter from "./routes/cart.router.js";
import productRouter from "./routes/product.router.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//Listen
app.listen(PUERTO, ()=>{
    console.log(`Escuchando el puerto: ${PUERTO}`);
})