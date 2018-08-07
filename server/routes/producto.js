const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion')

let app = express();

let Producto = require('../models/producto');

const _ = require('underscore');


// ==================================
// Obtener todas los productos
// ==================================
app.get('/producto', verificaToken, (req, res) => {
    // paginado    

    Producto.find({}, "descripcion categoria usuario")
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                productos
            });

        });

});


// ==================================
// Mostrar una producto por ID
// ==================================
app.get('/producto/:id', verificaToken, (req, res) => {
    // populate
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            })
        };

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});


// ==================================
// Crear nuevo producto
// ==================================
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});


// ==================================
// Actualizar un producto
// ==================================
app.put('/producto/:id', verificaToken, (req, res) => {
    // Actualizar producto
    let id = req.params.id;
    let body = req.body;

    let updProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion
    };

    Producto.findByIdAndUpdate(id, updProducto, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            })
        };

        res.json({
            ok: true,
            producto: productoDB
        });
    });

});


// ==================================
// Borrar un producto
// ==================================
app.delete('/producto/:id', [verificaToken], (req, res) => {
    let id = req.params.id;

    let cambiaEstado = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});

module.exports = app;