const express = require('express');
const router = express.Router();
const db = require('../database');
const Schema = require('../models/init-models');

const USUARIO = Schema.default(db).usuario;

router.get('/', async (req, res) => {
    const usuarios = await USUARIO.findAll({
        attributes: ['id', 'email', 'nickname', 'id_tipo_usuario']
      });    
    res.json(usuarios);
});

router.get('/:id', async (req, res) => {
    const findUsuario = await USUARIO.findOne({ where: { id: req.params.id } });
    if (findUsuario === null) {
        console.log('Not found!');
        res.status(400).json({status: 'error', msj: 'No existe este Usuario'});
    } else {
        console.log(findUsuario instanceof USUARIO); // true
        res.json(findUsuario);
    }
});

router.post('/', async (req, res) => {
    const { email, password, nickname, id_tipo_usuario } = req.body;
    const newUsuario = await USUARIO.create({
        email: email,
        password: password,
        nickname: nickname,
        id_tipo_usuario: id_tipo_usuario
    },{ fields: ['email', 'password', 'nickname', 'id_tipo_usuario'] })
    .then(message => {
        console.log(message);
        res.json({status: 'success', msj: 'Usuario creado'});
        // you can now access the newly ChatMessage task via the variable message
    }).catch(err => {
        console.log(err);
        res.status(400).json({status: 'error', msj: 'Usuario no creado'});
        // catch error if anything goes wrong
    });    
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const findUsuario = await USUARIO.findOne({ where: { email: email, password: password } });
    if (findUsuario === null) {
        console.log('Not found!');
        res.status(401).json({status: 'error', msj: 'Datos Incorrectos'});
    } else {
        console.log(findUsuario instanceof USUARIO); // true
        res.json(findUsuario);
    }
});

router.put('/:id', async (req, res) => {
    const { email, password, nickname, id_tipo_usuario } = req.body;
    await USUARIO.update({ 
        email: email,
        password: password,
        nickname: nickname,
        id_tipo_usuario: id_tipo_usuario
    },
    { where: { id: req.params.id } }
    ).then((result) => {
        // here result will be [ 1 ], if the id column is unique in your table
        // the problem is that you can't return updated instance, you would have to retrieve it from database once again
        console.log(result);
        if (result == 1) {
            res.json({status: 'success', msj: 'Usuario actualizado'});
        } else {
            res.status(400).json({status: 'warning', msj: 'No se realizó ningún cambio'});
        }
    }).catch(e => {
        console.log(e);
        res.status(400).json({status: 'Error', msj: 'Ocurrio un error al realizar Peticion'});
    });
});

router.delete('/:id', async (req, res) => {
    await USUARIO.destroy({
        where: {
          id: req.params.id
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
            res.json({status: 'success', msj: 'Usuario eliminado'});
        } else {
            res.status(400).json({status: 'error', msj: 'El Usuario no existe'});
        }
    }, function(err){
        console.log(err);
        res.status(400).json({status: 'error', msj: 'Hubo un problema con tu solicituddddd'});
    });    
});

module.exports = router;