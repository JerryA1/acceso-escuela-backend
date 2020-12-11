const express = require('express');
const router = express.Router();
const db = require('../database');
const Schema = require('../models/init-models');

const LISTA_ACCESO = Schema.default(db).lista_acceso;
const Fecha = Schema.default(db).fecha;
const Alumno = Schema.default(db).alumno;
const Registrador = Schema.default(db).personal;

router.get('/', async (req, res) => {
    const listas = await LISTA_ACCESO.findAll({
        attributes: ['id', 'hora', 'comentario'],
        include: [{model: Fecha}, {model: Alumno}, {model: Registrador}]
      });    
    res.json(listas);
});

router.get('/alumno/:id', async (req, res) => {
    const findLista = await LISTA_ACCESO.findAll({ 
        attributes: ['id', 'hora', 'comentario'],
        include: [{model: Fecha}, {model: Alumno}, {model: Registrador}],
        where: { id_alumno: req.params.id } 
    });
    if (findLista == 0) {
        console.log('Not found!');
        res.status(400).json({status: 'error', msj: 'No existe este Registro'});
    } else {
        // console.log(findLista instanceof LISTA_ACCESO); // true
        res.json(findLista);
    }
});

router.get('/fecha/:id', async (req, res) => {
    const findLista = await LISTA_ACCESO.findAll({ 
        attributes: ['id', 'hora', 'comentario'],
        include: [{model: Fecha}, {model: Alumno}, {model: Registrador}],
        where: { id_alumno: req.params.id } 
    });
    if (findLista == 0) {
        console.log('Not found!');
        res.status(400).json({status: 'error', msj: 'No existe este Registro'});
    } else {
        // console.log(findLista instanceof LISTA_ACCESO); // true
        res.json(findLista);
    }
});

router.get('/alumno/fecha/:id_a/:id_f', async (req, res) => {
    const findLista = await LISTA_ACCESO.findOne({ 
        attributes: ['id', 'hora', 'comentario'],
        include: [{model: Fecha}, {model: Alumno}, {model: Registrador}],
        where: { id_alumno: req.params.id_a, id_fecha:  req.params.id_f} 
    });
    if (findLista === null) {
        console.log('Not found!');
        res.status(400).json({status: 'error', msj: 'No existe este Registro'});
    } else {
        // console.log(findLista instanceof LISTA_ACCESO); // true
        res.json(findLista);
    }
});

router.post('/', async (req, res) => {
    const { id_fecha, id_alumno, id_registrador, comentario } = req.body;
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var hora = dt.format('H:M:S');
    // console.log(hora);

    const newAlumno = await LISTA_ACCESO.create({
        id_fecha: id_fecha,
        id_alumno: id_alumno,
        id_registrador: id_registrador,
        hora: hora,
        comentario: comentario,
    },{ fields: ['id_fecha', 'id_alumno', 'id_registrador', 'hora', 'comentario'] })
    .then(message => {
        // console.log(message);
        res.json({status: 'success', msj: 'Registro de entrada creado'});
        // you can now access the newly ChatMessage task via the variable message
    }).catch(err => {
        console.log(err);
        res.status(400).json({status: 'error', msj: 'Registro de entrada no creado'});
        // catch error if anything goes wrong
    });    
});

// router.put('/:id', async (req, res) => {
//     const { id_fecha, id_alumno, id_registrador, hora, comentario, activo } = req.body;
//     await LISTA_ACCESO.update({ 
//         id_fecha: id_fecha,
//         id_alumno: id_alumno,
//         id_registrador: id_registrador,
//         hora: hora,
//         comentario: comentario,
//         activo: activo
//     },
//     { where: { id: req.params.id } }
//     ).then((result) => {
//         // here result will be [ 1 ], if the id column is unique in your table
//         // the problem is that you can't return updated instance, you would have to retrieve it from database once again
//         console.log(result);
//         if (result == 1) {
//             res.json({status: 'success', msj: 'Alumno actualizado'});
//         } else {
//             res.status(400).json({status: 'warning', msj: 'No se realizó ningún cambio'});
//         }
//     }).catch(err => {
//         console.log(err);
//         res.status(400).json({status: 'error', msj: 'Alumno no Modificado'});
//     });
// });

module.exports = router;
