import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "variables.env" });

// Connect to database
db.authenticate()
  .then(() => console.log("Db is connected"))
  .catch((err) => console.log(err));

// Definir puerto y host
const port = process.env.PORT || 4000;
const host = process.env.HOST || "0.0.0.0";

// Habilitar pug
app.set("view engine", "pug");

// Obtener el año actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes";
  next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta pública
app.use(express.static("public"));

// Agregar router
app.use("/", router);

app.listen(port, host, () => {
  console.log(
    `El servidor esta funcionando en el puerto ${port} y el host ${host}`
  );
});
