import { GQLAuthGuards } from './gql.authguards';
/* eslint-disable prettier/prettier */

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserResolver } from './user.resolver';
import { UserInput } from './types/user.input';

@Module({
  imports: [
    JwtModule.register({
      secret:'secret',
      signOptions:{
        expiresIn:3600,
      },
    }),

    
    PassportModule.register({
      defaultStrategy:'jwt'
    }),


    TypeOrmModule.forFeature([UserRepository])],
  controllers: [],
  providers: [UserService,JwtStrategy,UserResolver,UserInput,GQLAuthGuards],
  exports: [JwtStrategy,PassportModule],
})
export class UserModule {}
