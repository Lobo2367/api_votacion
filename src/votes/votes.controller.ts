import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { VotesService } from './votes.service';


@Controller('Votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}


  @Post('/vote')
    async addvote(
      @Body('cedula') cedulax: string,
      @Body('codeCandidate') codeCandidatex: number,
    ) {
      const result = await this.votesService.insertVote(
        cedulax,
        codeCandidatex,
      );
      return {
        msg: 'Vote successfully registered',
        //voteId: result.id,
        //cedula: result.cedula
      };
    }
      @UseGuards(AuthenticatedGuard)
      @Get('/votes')
      async getvotes() {
      const votes = await this.votesService.getVotes();
      return votes;
      }

      

  }
