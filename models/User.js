import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

//FUNCIONES A EJECUTAR ANTES DE QUE SE INCIE LA FUNCION DEL SCHEMA EN ESTE CASO SAVE
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified) return next();
  try {
    // Se crea un hash de la contraseña añadiendo valores aleatorios con salt
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(user.password, salt);
    //Se sustituye el valor de la contraseña no encriptada por la encriptada para guardarlo
    user.password = hashPassword;
    next();
  } catch (error) {
    console.error(error);
    throw new Error("Fallo el hash de la pass");
  }
});

//COMPRUEBA QUE LA CONTRASEÑA SEA LA CORRECTA CON LA FUNCION COMPARE
userSchema.methods.comparePassword = async function(prePassword){
  return await bcryptjs.compare(prePassword, this.password);
}

export const User = model("User", userSchema);
