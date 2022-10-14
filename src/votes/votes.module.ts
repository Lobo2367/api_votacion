import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteSchema } from './entities/vote.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: "vote", schema: VoteSchema }]),
   MongooseModule.forFeature([{name : "candidate" , schema : VoteSchema}])],
  controllers: [VotesController],
  providers: [VotesService,],
  exports:[VotesService]
})
export class VotesModule {}
