const format = require ('pg-format');
const { pool } = require ('../config/db.js');

const obtenerJoyasBD = async ({
  limits = 10,
  order_by = 'id_ASC',
  page = 1,
}) => {
  if (page < 1) {
    throw Error ('Página no puede ser negativa');
  }

  const offset = (page - 1) * limits;
  const [campo, sentido] = order_by.split ('_');

  let consultaFormatada = format (
    'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
    campo,
    sentido,
    limits,
    offset
  );
  const {rows: joyas} = await pool.query (consultaFormatada);
  return joyas;
};

const obtenerJoyasXFiltroBD = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let filtros = [];
  if (typeof precio_min != 'undefined' && precio_min >0){
    filtros.push(`precio >= ${precio_min}`)
  }
  if (typeof precio_max != 'undefined' && precio_max >0){
    filtros.push(`precio <= ${precio_max}`)
  }
  if (typeof categoria != 'undefined' && categoria != ''){
    filtros.push(`categoria like '${categoria}%'`)
  }
  if (typeof metal != 'undefined' && metal != ''){
    filtros.push(`metal like '${metal}%'`)
  }

  let consultaFormatada = format ('SELECT * FROM inventario');

  if(filtros.length>0){
    const whereSQL = filtros.join(" AND ")
    consultaFormatada += format(' WHERE %s', whereSQL)
  }

  const {rows: joyas} = await pool.query (consultaFormatada);
  return joyas;
};

const prepararHATEOAS = async(joyas) => {
  const results = joyas.map(m => {
      return {
        name: m.nombre,
        href: `/joyas/joya/${m.id}`,
      };
    })
    .slice (0, joyas.length);
  const total = joyas.length;
  const HATEOAS = {
    total,
    results
  };
  return HATEOAS;
};

// Exportamos la función
module.exports = {obtenerJoyasBD, obtenerJoyasXFiltroBD, prepararHATEOAS};