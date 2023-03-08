const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
    const eventos = await Evento.find().populate('user', 'name email');

    res.status(200).json({
        ok: true,
        eventos: eventos
    });
}

const createEventos = async (req, res = response) => {

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            msg: 'Evento Guardado',
            evento: eventoGuardado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error interno, lo sentimos :( '
        })

    }
}

const updateEventos = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "El evento no existe, verifique"
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "no tiene autorizacion para hacer esta accion"
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoUpdate = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(200).json({
            ok: true,
            msg: "Evento actualizado correctamente",
            evento_actualizado: eventoUpdate
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error interno, lo sentimos :/'
        });
    }

    res.status(200).json({
        ok: true
    })
}

const deleteEventos = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "El evento no existe, verifique"
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "no tiene autorizacion para hacer esta accion"
            });
        }

        await Evento.findByIdAndDelete(eventoId);

        res.status(200).json({
            ok: true,
            msg: "Evento eliminado correctamente",
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error interno, lo sentimos :/'
        });
    }
}

module.exports = {
    getEventos,
    createEventos,
    updateEventos,
    deleteEventos,
}