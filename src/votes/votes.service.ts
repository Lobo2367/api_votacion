import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const add = await this.addVoteToCandidate(codeCandidatex);
    //const result = await newVote.save();
    //return result;
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

  async addVoteToCandidate(codeCandidate: number) {
    const num : number = 1
    const alt = await this.findCandidate(codeCandidate);
    console.log(alt)
    alt.votosCandidate = alt.votosCandidate+1
    console.log(alt.votosCandidate)
    //const plus = await user.save();
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


}
