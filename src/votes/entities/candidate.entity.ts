import * as mongoose from "mongoose"

export const CandidateSchema = new mongoose.Schema(
  {
    nameCandidate: {
      type: String,
      required: true,
      unique: true
    },
    partyCandidato: {
        type : String,
        required : true,
        unique : false
    },
    codeCandidate: {
        type : Number,
        //required : true,
        //unique : true
    },
    votosCandidate: {
        type : Number,
        required : true,
        unique : false
    },
    fechaHora: {
        type: String,
        required: false,
      }
  },
  { timestamps: true }
)

export interface Candidate extends mongoose.Document {
  _idCandidate: string;
  codeCandidate: number;
  partyCandidato: string;
  nameCandidate : string;
  votosCandidate : number;
  fechaHora: string;
}