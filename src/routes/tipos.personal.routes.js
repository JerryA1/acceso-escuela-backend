const express = require('express');
const router = express.Router();
const db = require('../database');
const Schema = require('../models/init-models');

const TIPO_PERSONAL = Schema.default(db).tipo_personal;

router.get('/', async (req, res) => {
    const tipos_personal = await TIPO_PERSONAL.findAll({
        attributes: ['id', 'tipo']
      });    
    res.json(tipos_personal);
});

router.get('/:id', async (req, res) => {
    const findTipo_personal = await TIPO_PERSONAL.findOne({ where: { id: req.params.id } });
    if (findTipo_personal === null) {
        console.log('Not found!');
        res.json({status: 'error', msj: 'No existe este Tipo de personal'});
    } else {
        console.log(findTipo_personal instanceof TIPO_PERSONAL); // true
        res.json(findTipo_personal);
    }
});

router.post('/', async (req, res) => {
    const { tipo } = req.body;
    const newtipo_personal = await TIPO_PERSONAL.create({
        tipo: tipo
    },{ fields: ['tipo'] })
    .then(message => {
        console.log(message);
        res.json({status: 'success', msj: 'Tipo de personal creado'});
        // you can now access the newly ChatMessage task via the variable message
    }).catch(err => {
        console.log(err);
        res.json({status: 'error', msj: 'Tipo de personal no creado'});
        // catch error if anything goes wrong
    });    
});

router.put('/:id', async (req, res) => {
    const { tipo } = req.body;
    await TIPO_PERSONAL.update({ 
        tipo: tipo
    },
    { where: { id: req.params.id } }
    ).then((result) => {
        // here result will be [ 1 ], if the id column is unique in your table
        // the problem is that you can't return updated instance, you would have to retrieve it from database once again
        console.log(result);
        if (result == 1) {
            res.json({status: 'success', msj: 'Tipo de personal actualizado'});
        } else {
            res.json({status: 'warning', msj: 'No se realizó ningún cambio'});
        }
    }).catch(e => {
        console.log(e);
        res.json('Error');
    });
});

router.delete('/:id', async (req, res) => {
    await TIPO_PERSONAL.destroy({
        where: {
          id: req.params.id
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
            res.json({status: 'success', msj: 'Tipo de personal eliminado'});
        } else {
            res.json({status: 'error', msj: 'El Tipo de personal no existe'});
        }
    }, function(err){
        console.log(err);
        res.json({status: 'error', msj: 'Hubo un problema con tu solicitud'});
    });    
});

module.exports = router;