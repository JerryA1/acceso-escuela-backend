const express = require('express');
const router = express.Router();
const db = require('../database');
const Schema = require('../models/init-models');
const { Op } = require('sequelize');

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
        res.status(400).json({status: 'error', msj: 'No existe este alumno'});
    } else {
        console.log(findAlumno instanceof ALUMNO); // true
        res.json(findAlumno);
    }
});

router.get('/ausentes/:id_f', async (req, res) => {
    const fecha=req.params.id_f;
    const tempSQL = (await db.query('SELECT id_alumno as id FROM lista_acceso WHERE id_fecha='+fecha))[0].map(al => al.id);
    const lista = await ALUMNO.findAll({
        attributes: ['id', 'nombre', 'apellido', 'foto', 'direccionDefault', 'curp', 'activo'],
        where: {id: {[Op.notIn]: tempSQL}}
    });
    res.json(lista);
});

router.get('/presentes/:id_f', async (req, res) => {
    const fecha=req.params.id_f;
    const tempSQL = (await db.query('SELECT id_alumno as id FROM lista_acceso WHERE id_fecha='+fecha))[0].map(al => al.id);
    const lista = await ALUMNO.findAll({
        attributes: ['id', 'nombre', 'apellido', 'foto', 'direccionDefault', 'curp', 'activo'],
        where: {id: {[Op.in]: tempSQL}}
    });
    res.json(lista);
});

router.get('/porsalir/:id_f', async (req, res) => {
    const fecha=req.params.id_f;
    const tempSQL = (await db.query('SELECT id_alumno as id FROM lista_acceso WHERE id_fecha='+fecha))[0].map(al => al.id);
    const tempSQL2 = (await db.query('SELECT id_alumno as id FROM lista_salida WHERE id_fecha='+fecha))[0].map(al => al.id);
    const lista = await ALUMNO.findAll({
        attributes: ['id', 'nombre', 'apellido', 'foto', 'direccionDefault', 'curp', 'activo'],
        where: {id: {[Op.notIn]: tempSQL2, [Op.in]: tempSQL}}
    });
    res.json(lista);
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
        res.status(400).json({status: 'error', msj: 'Alumno no creado'});
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
            res.status(400).json({status: 'warning', msj: 'No se realizó ningún cambio'});
        }
    }).catch(e => {
        console.log(e);
        res.status(400).json({status: 'error', msj: 'Alumno no Modificado'});
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
            res.status(400).json({status: 'error', msj: 'El alumno no existe'});
        }
    }, function(err){
        console.log(err);
        res.status(400).json({status: 'error', msj: 'Hubo un problema con tu solicituddddd'});
    });    
});

module.exports = router;
