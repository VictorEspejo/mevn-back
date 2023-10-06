import mongoose from "mongoose";


//CONECTAMOS BASE DE DATOS UTILIZANDO VARIABLES DE ENTORNO
try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log('MONGODB OK');
} catch (error) {
    console.error(error);
}