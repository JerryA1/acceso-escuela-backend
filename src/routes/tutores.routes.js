const express = require('express');
const router = express.Router();
const db = require('../database');
const Schema = require('../models/init-models');

const TUTOR = Schema.default(db).tutor;

router.get('/', async (req, res) => {
    const tutores = await TUTOR.findAll({
        attributes: ['id', 'nombre', 'apellido', 'foto', 'tel', 'curp', 'id_usuario']
      });    
    res.json(tutores);
});

router.get('/:id', async (req, res) => {
    const findTutor = await TUTOR.findOne({ where: { id: req.params.id } });
    if (findTutor === null) {
        console.log('Not found!');
        res.json({status: 'error', msj: 'No existe este tutor'});
    } else {
        console.log(findTutor instanceof TUTOR); // true
        res.json(findTutor);
    }
});

router.post('/', async (req, res) => {
    const { nombre, apellido, curp, foto, tel, id_usuario } = req.body;
    const newTutor = await TUTOR.create({
        nombre, apellido, curp, foto, tel, id_usuario
    },{ fields: ['nombre', 'apellido', 'curp', 'foto', 'tel', 'id_usuario'] })
    .then(message => {
        console.log(message);
        res.json({status: 'success', msj: 'Tutor creado'});
        // you can now access the newly ChatMessage task via the variable message
    }).catch(err => {
        console.log(err);
        res.json({status: 'error', msj: 'Tutor no creado'});
        // catch error if anything goes wrong
    });    
});

router.put('/:id', async (req, res) => {
    const { nombre, apellido, curp, foto, tel, id_usuario } = req.body;
    await TUTOR.update({ 
        nombre, apellido, curp, foto, tel, id_usuario
    },
    { where: { id: req.params.id } }
    ).then((result) => {
        // here result will be [ 1 ], if the id column is unique in your table
        // the problem is that you can't return updated instance, you would have to retrieve it from database once again
        console.log(result);
        if (result == 1) {
            res.json({status: 'success', msj: 'Tutor actualizado'});
        } else {
            res.json({status: 'warning', msj: 'No se realizó ningún cambio'});
        }
    }).catch(e => {
        console.log(e);
        res.json('Error');
    });
});

router.delete('/:id', async (req, res) => {
    await TUTOR.destroy({
        where: {
          id: req.params.id
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
            res.json({status: 'success', msj: 'Tutor eliminado'});
        } else {
            res.json({status: 'error', msj: 'El tutor no existe'});
        }
    }, function(err){
        console.log(err);
        res.json({status: 'error', msj: 'Hubo un problema con tu solicitud'});
    });    
});

module.exports = router;