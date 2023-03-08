const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            res.status(400).json({
                ok: false,
                msg: "El usuario ya existe con ese email"
            });
        }

        usuario = new Usuario(req.body);

        //generar token
        const token = await generarJWT(usuario.id, usuario.name);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        res.status(201).json({
            ok: true,
            msg: 'registro',
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el usuario :('
        });
    }
}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        ///validar si existe el usuario
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            res.status(400).json({
                ok: false,
                msg: "Usuario y/o contraseña invalidos"
            });
        }
        //validar los passwords
        const validatePassword = bcrypt.compareSync(password, usuario.password);

        if (!validatePassword) {
            res.status(400).json({
                ok: false,
                msg: "Usuario y/o contraseña invalidos"
            });
        }

        //generar token
        const token = await generarJWT(usuario.id, usuario.name);
        res.json({
            ok: true,
            msg: 'BIENVENIDO',
            usuario,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el usuario :('
        });
    }
}

const revalidarToken = async(req, res = response) => {

    const {uid, name} = req;
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}