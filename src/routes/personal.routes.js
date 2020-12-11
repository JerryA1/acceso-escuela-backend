const express = require('express');
const router = express.Router();
const db = require('../database');
const Schema = require('../models/init-models');

const PERSONAL = Schema.default(db).personal;

router.get('/', async (req, res) => {
    const personal = await PERSONAL.findAll({
        attributes: ['id', 'nombre', 'apellido', 'rfc', 'tel', 'id_tipo_personal', 'activo']
      });    
    res.json(personal);
});

router.get('/:id', async (req, res) => {
    const findPersonal = await PERSONAL.findOne({ where: { id: req.params.id } });
    if (findPersonal === null) {
        console.log('Not found!');
        res.status(400).json({status: 'error', msj: 'No existe este alumno'});
    } else {
        console.log(findPersonal instanceof PERSONAL); // true
        res.json(findPersonal);
    }
});

router.post('/', async (req, res) => {
    const { nombre, apellido, rfc, tel, id_tipo_personal, id_usuario, activo } = req.body;
    const newPersonal = await PERSONAL.create({
        nombre: nombre,
        apellido: apellido,
        rfc: rfc,
        tel: tel,
        id_tipo_personal: id_tipo_personal,
        id_usuario: id_usuario,
        activo: activo
    },{ fields: ['nombre', 'apellido', 'rfc', 'tel', 'id_tipo_personal', 'id_usuario', 'activo'] })
    .then(message => {
        console.log(message);
        res.json({status: 'success', msj: 'Personal creado'});
        // you can now access the newly ChatMessage task via the variable message
    }).catch(err => {
        console.log(err);
        res.status(400).json({status: 'error', msj: 'Personal no creado'});
        // catch error if anything goes wrong
    });    
});

router.put('/:id', async (req, res) => {
    const { nombre, apellido, foto, direccionDefault, curp, activo } = req.body;
    await PERSONAL.update({ 
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
    await PERSONAL.destroy({
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
