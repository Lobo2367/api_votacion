import * as mongoose from "mongoose"

export const CandidateSchema = new mongoose.Schema(
  {
    partyCandidato: {
        type : String,
        //required : true,
    },
    codeCandidate: {
        type : Number,
        //required : true,
        //unique : true
    },
    votosCandidate: {
        type : Number,
        //required : true,
    },
    fechaHora: {
        type: String,
      }
  },
  { timestamps: true }
)

export interface Candidate extends mongoose.Document {
  codeCandidate: number;
  partyCandidato: string;
  votosCandidate : number;
  fechaHora: string;
}