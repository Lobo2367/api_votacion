import * as mongoose from "mongoose"
export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required : true
    },
    password: {
      type: String,
      required: true,
    },
    cedula: {
        type: String,
        required: true,
      },
    direccion: {
        type: String,
        //required: true,
      },
    nombres: {
        type: String,
        //required: true,
      },
    apellidos: {
        type: String,
        //required: true,
      },
      telefono: {
        type: Number,
        //required: true,
      }  
  },
  { timestamps: true }
)

export interface User extends mongoose.Document {
  _id: string;
  username: string;
  cedula: string;
  password: string;
  nombre: string;
  apellidos: string;
  telefono: number;
}