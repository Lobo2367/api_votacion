import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UsersModule } from "./users/users.module"
import { AuthModule } from './auth/auth.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Lobo2367:santiagodecuba@voting.bwshn1j.mongodb.net/Voting?retryWrites=true&w=majority'
    ),
    UsersModule,
    AuthModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}