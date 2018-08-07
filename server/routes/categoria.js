const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion')

let app = express();

let Categoria = require('../models/categoria');

// ==================================
// mostrar todas las categorias
// ==================================
app.get('/categoria', (req, res) => {

    Categoria.find({}, 'descripcion')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Categoria.count({}, (err, conteo) => {
                res.json({
                    cuantos: conteo,
                    ok: true,
                    categorias
                });
            });

        });

});


// ==================================
// Mostrar una categoria por ID
// ==================================
app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


// ==================================
// Crear nueva categoria
// ==================================
app.post('/categoria', (req, res) => {
    // Regresa nueva categoria
    // req.usuario._id

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

// ==================================
// Actualizar categoria
// ==================================
app.put('/categoria/:id', (req, res) => {
    // Actualizar categoria
    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, body, { new: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

// ==================================
// Borrar categoria
// ==================================
app.delete('/categoria/:id', (req, res) => {
    // solo un administrador 
    // verificar token
    // Categoria.findByIdAndRemove

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada
        });

    });

});

module.exports = app;