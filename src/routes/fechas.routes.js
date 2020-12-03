const express = require('express');
const router = express.Router();
const db = require('../database');
const Schema = require('../models/init-models');
const dateTime = require('node-datetime');

const FECHA = Schema.default(db).fecha;

router.get('/', async (req, res) => {
    const fechas = await FECHA.findAll();    
    res.json(fechas);
});

router.get('/hoy', async (req, res) => {
    var dt = dateTime.create();
    var fecha = dt.format('Y-m-d');

    const findFecha = (await FECHA.findCreateFind({ where: { fecha: fecha }, default: fecha}))[0];
    if (findFecha === null) {
        console.log('Not found!');
        res.status(400).json({status: 'error', msj: 'No existe esta fecha en las listas'});
    } else {
        console.log(findFecha instanceof FECHA); // true
        res.json(findFecha);
    }
});

router.get('/consultar/:id', async (req, res) => {
    const findFecha = await FECHA.findOne({ where: { id: req.params.id } });
    if (findFecha === null) {
        console.log('Not found!');
        res.status(400).json({status: 'error', msj: 'No existe esta fecha en las listas'});
    } else {
        console.log(findFecha instanceof FECHA); // true
        res.json(findFecha);
    }
});

// router.post('/', async (req, res) => {
//     var dt = dateTime.create();
//     var fecha = dt.format('Y-m-d');
//     // console.log(fecha);

//     const newFecha = await FECHA.create({
//         fecha: fecha,
//     },{ fields: ['fecha'] })
//     .then(message => {
//         console.log(message);
//         res.json({status: 'success', msj: 'Fecha creada'});
//         // you can now access the newly ChatMessage task via the variable message
//     }).catch(err => {
//         console.log(err);
//         res.status(400).json({status: 'error', msj: 'Fecha no creado'});
//         // catch error if anything goes wrong
//     });    
// });

module.exports = router;
