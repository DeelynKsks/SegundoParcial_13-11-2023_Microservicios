const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const app = express();
const PORT = 8080;

const dbConnInfo = {
  name: 'personas',
  user: 'root',
  password: 'root1',
  host: 'db_service',
  dialect: 'mysql',
};

const sequelize = new Sequelize(
  dbConnInfo.name,
  dbConnInfo.user,
  dbConnInfo.password,
  {
    host: dbConnInfo.host,
    dialect: dbConnInfo.dialect,
  },
);

const Personas = sequelize.define(
  'personas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    apellidos: {
      type: DataTypes.STRING,
    },
    nombres: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  },
);

sequelize.sync();
app.use(cors());
app.options('/insertar_con_rest', cors());
app.use(express.json());

app.post('/insertar_con_rest', async (req, res) => {
    console.log('Recibida solicitud POST:', req.body);
    const { apellidos, nombres, dni } = req.body;
    try {
      await Personas.create({ apellidos, nombres, dni });
      
      return res.json({ message: 'Informacion guardada correctamente' });s
    } catch (error) {
      console.error('Error al guardar la informacion: ', error);
      return res.status(500).json({ error: 'Error al guardar la informacion' });
    }
});

app.listen(PORT, () => {
  console.log(`Servidor REST corriendo en el puerto ${PORT}`);
});
