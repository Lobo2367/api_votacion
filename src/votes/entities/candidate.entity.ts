import * as mongoose from "mongoose"

export const CandidateSchema = new mongoose.Schema(
  {
    codeCandidate : {type : Number},
    votosCandidate : {type : Number},
    fechaHora : {type : String}
  }
)

export interface Candidate extends mongoose.Document {
  codeCandidate: number;
  votosCandidate : number;
  fechaHora: string;
}