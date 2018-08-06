const express = require('express');
const bcrypt = require('bcrypt');
<<<<<<< HEAD
=======
const jwt = require('jsonwebtoken');

>>>>>>> a9db17bf40d4fb3054b06d687f939de587417b5d
const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {

<<<<<<< HEAD
    res.json({
        ok: true
    })

=======
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // validar que el usuario exista
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        // validar contraseña
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o {contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });



    });
>>>>>>> a9db17bf40d4fb3054b06d687f939de587417b5d

})


module.exports = app;