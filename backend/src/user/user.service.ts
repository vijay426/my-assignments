import { ID } from '@nestjs/graphql';
import { UserInput } from './types/user.input';
import { JwtPayload } from './jwt.payload';
import { NotFoundException } from '@nestjs/common';
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository, 
        private jwtService :JwtService
    ){}
    async signup(userInput:UserInput) {
        return this.userRepository.signup(userInput);
    }
async signin(userInput:UserInput) {
    const user= await this.userRepository.signin(userInput);
    if(!user){
        throw new NotFoundException('user not found');
    }
//return {username:authCredentialsDTO.username}:
    const payload:JwtPayload={
        username:user.username,
        id:user.id,
        
    };
    const token=await this.jwtService.sign(payload);
    return {token,user}
}
}
