const express = require("express");
const cors = require("cors");

const clienteRouter = require('./routes/clientes');
const loginRouter = require('./routes/login');
const productoRouter = require('./routes/productos');
const facturaRouter = require('./routes/facturas');
const detallesFacturasRouter = require('./routes/detallesFacturas');
const paseId = require('./routes/paseId');


const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));
app.use(express.json());

//ruta para login
app.use('/login', loginRouter);
// Ruta para clientes
app.use('/clientes', clienteRouter);
// Ruta para productos
app.use('/productos', productoRouter);
// Ruta para facturas
app.use('/facturas', facturaRouter);
// Ruta para detalles de facturas
app.use('/detalles', detallesFacturasRouter);

app.use("/solucion", paseId)



// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
async function sincronizarModelo() {
  try {
    await Usuario.sync();
    console.log('Modelo sincronizado correctamente con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar modelo con la base de datos:', error);
  }
}

// Llamar a la función para sincronizar el modelo
sincronizarModelo();

// Iniciar el servidor
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
