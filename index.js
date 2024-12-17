const express = require('express');
// Uso de middleware para rutas específicas
const app = express();
const port = 3000;

app.listen(port, console.log(`Server backend ON - Puerto: ${port}`));

const { obtenerJoyas } = require('./controllers/joyas.js');
const { obtenerJoyasXFiltro } = require('./controllers/joyas.js');
const { informeEjecucion } = require('./controllers/joyas.js');


app.get('/joyas', async (req, res) => {
  obtenerJoyas(req, res);
  informeEjecucion(req);
})

app.get('/joyas/filtros', async (req, res) => {
  obtenerJoyasXFiltro(req, res);
  informeEjecucion(req);
})

app.get("*", (req, res) => {
  res.status(404).send("Ruta inválida, pues no existe")
})
