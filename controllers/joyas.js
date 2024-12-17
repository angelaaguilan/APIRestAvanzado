const {
  obtenerJoyasBD,
  obtenerJoyasXFiltroBD,
  prepararHATEOAS,
} = require ('../models/joyas.js');

const obtenerJoyas = async (req, res) => {
  const { limits, order_by, page } = req.query;
  try {
    const data = await obtenerJoyasBD ({
      limits,
      order_by,
      page,
    });
    const HATEOAS = await prepararHATEOAS (data);
    registraLog(req.method, req.url)
    res.status (200).json (HATEOAS);
  } catch (error) {
    res.status (500).send (error.message);
  }
};

const obtenerJoyasXFiltro = async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;
    const data = await obtenerJoyasXFiltroBD ({
      precio_min,
      precio_max,
      categoria,
      metal,
    });
    const HATEOAS = await prepararHATEOAS (data);
    res.status (200).json(HATEOAS);
  } catch (error) {
    res.status (500).json ({msg: error.message});
  }
};

const informeEjecucion = (req) => {
  const fechaCreacion = new Date().toISOString();
  console.log(`Método:             ${req.method}`);
  console.log(`Ruta Usada:         ${req.originalUrl}`);
  console.log(`Fecha Ejecución:    ${fechaCreacion}`);
}

module.exports = {obtenerJoyas, obtenerJoyasXFiltro, informeEjecucion};