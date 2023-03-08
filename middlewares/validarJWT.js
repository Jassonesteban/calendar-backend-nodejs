const { response } = require("express")
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    //recibir el JWT
    const token = req.header('x-token');

    //validar token

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "falta token valido"
        });
    }

    try {
        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }



    next();
}

module.exports = {
    validarJWT
}