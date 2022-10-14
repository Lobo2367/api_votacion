import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Number } from 'mongoose';
import { Candidate } from './entities/candidate.entity';
import { Vote } from './entities/vote.entity';


@Injectable()
export class VotesService {
  constructor(
    @InjectModel('vote') private readonly voteModel : Model<Vote>, 
    @InjectModel('candidate') private readonly CandidateModel : Model<Candidate>
      ) {}

  async insertVote(cedulax : string, codeCandidatex: number ) {
    const newVote = new this.voteModel({
      codeCandidate : codeCandidatex,
      cedula: cedulax,
      fechaHora : new Date ().toLocaleString()
    });

    console.log(newVote);
    const add = await this.addVoteToCandidate(codeCandidatex);
    const result = await newVote.save();
    return result;
  }

  async getVotes() {
    const votes = await this.voteModel.find().exec();
    return votes.map(vote => ({
      id: vote.id,
      idVotante: vote.cedula,
      idCandidato: vote.codeCandidate,
      fechaHora: vote.fechaHora,
    }));
  }

  async getSingleVote(cedula: string) {
    const vote = await this.findVote(cedula);
    return {
      cedula : vote.cedula,
      idCandidato: vote.codeCandidate,
      fechaHora : vote.fechaHora
    };
  }

  async deleteVote(cedula: string) {
    const result = await this.voteModel.deleteOne({cedula: cedula}).exec();
  }

  private async findVote(cedula: string): Promise<Vote> {
    let vote;
    try {
      vote = await this.voteModel.findOne({cedula: cedula}).exec();
    } catch (error) {
      throw new NotFoundException('Could not find vote.');
    }
    if (!vote) {
      throw new NotFoundException('Could not find vote.');
    }
    return vote;
  }

  private async addVoteToCandidate(codeCandidatex: number) : Promise<Candidate> {
    const alt = await this.findCandidateandadd(codeCandidatex);
    console.log(alt);
    // console.log(CandidateModel)
    const result = await alt.save();
    return result;
  }


  private async findCandidate(idcandidatox: number): Promise<Candidate> {
    let vote;
    try {
      vote = await this.CandidateModel.find({codeCandidate : idcandidatox});
    } catch (error) {
      throw new NotFoundException('Could not find Candidate.');
    }
    if (!vote) {
      throw new NotFoundException('Could not find Candidate.');
    }
    return vote;
  }

  async insertCandidate(codeCandidatex : number, votosCandidatex: number){
    const newCandidate = new this.CandidateModel({
      votosCandidate: new Number(),
      codeCandidate : codeCandidatex,
      partyCandidato : 'ss',
      fechaHora : new Date ().toLocaleString()
    });
     console.log(newCandidate);
    const result = await newCandidate.save();
    return result;
  }

  private async findCandidateandadd(idcandidatox: number): Promise<Candidate> {
    let vote;
    const query = {"codeCandidate" : idcandidatox } //your query here
    const update = { $inc: { 'votosCandidate' : 1 }} //your update in json here
    const option = {new: true} //will return updated document
    try {
      vote = await this.CandidateModel.findOneAndUpdate(query, update, option).exec();
      console.log(vote)
    } catch (error) {
      throw new NotFoundException('Could not find Candidate.');
    }
    if (!vote) {
      throw new NotFoundException('Could not find Candidate.');
    }
    return vote;
  }


}
