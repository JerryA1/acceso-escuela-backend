const express = require('express');
const router = express.Router();
const db = require('../database');
const Schema = require('../models/init-models');

const ALUMNO = Schema.default(db).alumno;

router.get('/', async (req, res) => {
    const alumnos = await ALUMNO.findAll({
        attributes: ['id', 'nombre', 'apellido', 'foto', 'direccionDefault', 'curp', 'activo']
      });    
    res.json(alumnos);
});

router.get('/:id', async (req, res) => {
    const findAlumno = await ALUMNO.findOne({ where: { id: req.params.id } });
    if (findAlumno === null) {
        console.log('Not found!');
        res.json({status: 'error', msj: 'No existe este alumno'});
    } else {
        console.log(findAlumno instanceof ALUMNO); // true
        res.json(findAlumno);
    }
});

router.post('/', async (req, res) => {
    const { nombre, apellido, foto, direccionDefault, curp, activo } = req.body;
    const newAlumno = await ALUMNO.create({
        nombre: nombre,
        apellido: apellido,
        foto: foto,
        direccionDefault: direccionDefault,
        curp: curp,
        activo: activo
    },{ fields: ['nombre', 'apellido', 'foto', 'direccionDefault', 'curp', 'activo'] })
    .then(message => {
        console.log(message);
        res.json({status: 'success', msj: 'Alumno creado'});
        // you can now access the newly ChatMessage task via the variable message
    }).catch(err => {
        console.log(err);
        res.json({status: 'error', msj: 'Alumno no creado'});
        // catch error if anything goes wrong
    });    
});

router.put('/:id', async (req, res) => {
    const { nombre, apellido, foto, direccionDefault, curp, activo } = req.body;
    await ALUMNO.update({ 
        nombre: nombre,
        apellido: apellido,
        foto: foto,
        direccionDefault: direccionDefault,
        curp: curp,
        activo: activo
    },
    { where: { id: req.params.id } }
    ).then((result) => {
        // here result will be [ 1 ], if the id column is unique in your table
        // the problem is that you can't return updated instance, you would have to retrieve it from database once again
        console.log(result);
        if (result == 1) {
            res.json({status: 'success', msj: 'Alumno actualizado'});
        } else {
            res.json({status: 'warning', msj: 'No se realizó ningún cambio'});
        }
    }).catch(e => {
        console.log(e);
        res.json('Error');
    });
});

router.delete('/:id', async (req, res) => {
    await ALUMNO.destroy({
        where: {
          id: req.params.id
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
            res.json({status: 'success', msj: 'Alumno eliminado'});
        } else {
            res.json({status: 'error', msj: 'El alumno no existe'});
        }
    }, function(err){
        console.log(err);
        res.json({status: 'error', msj: 'Hubo un problema con tu solicituddddd'});
    });    
});

module.exports = router;