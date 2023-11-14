const express = require('express');
const soap = require('soap');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 8888;

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
  app.options('/consultar_con_soap', cors());

  const consultarAlumnos = async (args, callback) => {
    try {
        const personas = await Personas.findAll();
        const alumnos = personas.map(({ id, apellidos, nombres, dni }) => ({
            id: id.toString(),
            apellidos,
            nombres,
            dni: dni.toString()
        }));
        console.log(personas)
        callback(null, { alumnos });
    } catch (error) {
        console.error('Error al consultar la base de datos: ', error);
        callback(error);
    }
  } 

app.listen(PORT, () => {
    console.log(`Servidor SOAP corriendo en el puerto ${PORT}`);
});

const xml = require('fs').readFileSync('consultaPersonas.wsdl', 'utf8');

const serviceObject = {
    ConsultarAlumnosService: {
        ConsultarAlumnosPort: {
            consultarAlumnos: consultarAlumnos,
        },
    },
};

soap.listen(app, '/consultar_con_soap', serviceObject, xml);