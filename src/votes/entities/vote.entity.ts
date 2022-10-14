import * as mongoose from "mongoose"
export const VoteSchema = new mongoose.Schema(
  {
    cedula: {
      type: String
    },
    codeCandidate: {
      type: Number,
      required: true,
    },
    fechaHora: {
        type: String,
        required: false,
      }
  },
  { timestamps: true }
)

export interface Vote extends mongoose.Document {
  _idVoto: string;
  cedula: string;
  codeCandidate: string;
  fechaHora: string;
}