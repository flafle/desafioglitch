//Creo mi server con express
let fs = require('fs');

const express = require("express");

const PORT = process.env.PORT || 8080;

let app = express();

//para que express puede traducir json:
app.use(express.json());

//Uso clase contenedor del desafio pasado:
class Contenedor {
    constructor(url){
        this.url = url;
    }

    async save(objeto){
        const productos = await this.getAll();
        objeto.id = ( productos.length === 0 ) ? 1 : productos[productos.length - 1].id + 1;
        productos.push(objeto);
        try {
            console.log(`${JSON.stringify(objeto)}`);
            return await fs.promises.writeFile("./productos.json", JSON.stringify(productos, null, 2));
        } catch (error) {
            throw new Error(error);
        }
    }
    async getAll(){
        try {
            let productos = await fs.promises.readFile(this.url, 'utf-8');
            return JSON.parse( productos );
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

const FILE = new Contenedor("./productos.json");


//1) a y b; 
//crear ruta:

// GET /productos
app.get("/", (req, res, next) => {
    res.send( "Bienvenid@s a Azafrán")//ruta raíz



// GET ruta /productos
app.get("/productos", async (req,res) => {
    const allProductos = await Contenedor.getAll();
    res.json(allProductos);

// GET ruta /productos/random
app.get("/productosRandom", async (req, res) => {
    const todosProductos = allProductos.length;

    const randomNumber = NumeroRandom(1, todosProductos);
    const randomProducto = await Contenedor.getById(randomNumber);
    res.json(randomProducto);
  });
    const NumeroRandom = (min, max) => {
        return Math.floor((Math.floor()* (max+1 -min))+min);
    };

});

let connectedServer = app.listen(process.env.PORT || PORT, () => console.log(`Server on http://localhost:${PORT}`));

});
//app.get app.put app.post app.delete (metodos http)