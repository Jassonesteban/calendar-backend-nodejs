const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.DB_CN);

        console.log('BD online :D');
        
    } catch (error) {
        console.log(error);
        throw new Error('error al conectarse a la BD :(');
    }
}

module.exports = {
    dbConnection
}