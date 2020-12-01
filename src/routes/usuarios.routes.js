const express = require('express');
const router = express.Router();
const ensure = require('./authorization/ensure');
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
    const findUsuario = await USUARIO.findOne({ 
        where: { id: req.params.id },
        attributes: ['id', 'email', 'nickname', 'id_tipo_usuario']
    });
    if (findUsuario === null) {
        console.log('Not found!');
        res.status(400).json({status: 'error', msj: 'No existe este Usuario'});
    } else {
        console.log(findUsuario instanceof USUARIO); // true
        res.json(findUsuario);
    }
});

router.get('/restore/password/:email', async (req, res) => {
    const { email }=req.params;
    const findUsuario = await USUARIO.findOne({ 
        where: { email: email }
    });
    if (findUsuario === null) {
        console.log('Not found!');
        res.status(400).json({status: 'error', msj: 'Email no registrado'});
    } else {
        const token=ensure.sign(email, 'aplication-restore-password', 100, true);
        res.json({status: 'success', token: token});
    }
});

router.post('/', async (req, res) => {
    const { email, password, nickname, id_tipo_usuario } = req.body;
    const token=ensure.sign(email, nickname, id_tipo_usuario);
    const newUsuario = await USUARIO.create({
        email: email,
        // password: password,
        nickname: nickname,
        token: token,
        id_tipo_usuario: id_tipo_usuario
    },{ fields: ['email', 'nickname', 'token', 'id_tipo_usuario'] })
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
    const findUsuario = await USUARIO.findOne({ 
        where: { email: email, password: password },
        attributes: ['email', 'nickname', 'token']
    });
    if (findUsuario === null) {
        // console.log('Not found!');
        res.status(401).json({status: 'error', msj: 'Datos Incorrectos'});
    } else {
        // console.log(findUsuario instanceof USUARIO); // true
        // if(findUsuario.token===null){
        //     findUsuario.token=ensure.sign(findUsuario.email, findUsuario.nickname, findUsuario.id_tipo_usuario);
        // }
        res.json({status: 'success', usr: findUsuario});
    }
});

router.put('/:id', ensure.authorization, async (req, res) => {
    if(req.data.type!==1)
        return res.status(403).json({status: 'Error', msj: 'No tiene permisos para Esta operacion'});
    const { email, password, nickname, id_tipo_usuario } = req.body;
    const token=ensure.sign(email, nickname, id_tipo_usuario);
    await USUARIO.update({ 
        email: email,
        password: password,
        nickname: nickname,
        token: token,
        id_tipo_usuario: id_tipo_usuario
    },
    { where: { id: req.params.id } }
    ).then((result) => {
        // here result will be [ 1 ], if the id column is unique in your table
        // the problem is that you can't return updated instance, you would have to retrieve it from database once again
        // console.log(result);
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

router.put('/restore/password/:email', ensure.authorization, async (req, res) => {
    if(req.data.type!==100)
        return res.status(403).json({status: 'Error', msj: 'No tiene permisos para Esta operacion'});
    // const { password } = req.body;
    // await USUARIO.update({ 
    //     password: password
    // },
    // { where: { id: req.params.id } }
    // ).then((result) => {
    //     // here result will be [ 1 ], if the id column is unique in your table
    //     // the problem is that you can't return updated instance, you would have to retrieve it from database once again
    //     // console.log(result);
    //     if (result == 1) {
            res.json({status: 'success', msj: 'Contraseña actualizada'});
    //     } else {
    //         res.status(400).json({status: 'warning', msj: 'No se realizó ningún cambio'});
    //     }
    // }).catch(e => {
    //     console.log(e);
    //     res.status(400).json({status: 'Error', msj: 'Ocurrio un error al realizar Peticion'});
    // });
});

router.delete('/:id', ensure.authorization, async (req, res) => {
    if(req.data.type!==1)
        return res.status(403).json({status: 'Error', msj: 'No tiene permisos para Esta operacion'});
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