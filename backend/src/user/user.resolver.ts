/* eslint-disable prettier/prettier */

import { GQLAuthGuards } from './gql.authguards';
import { SigninResponse } from './types/signin.response';
import { UserService } from './user.service';
import { UserType } from './types/user.type';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserInput } from './types/user.input';
import { UseGuards } from '@nestjs/common';
import { GetUser } from './get.user.decorator';
import { UserEntity } from './user.entity';




@Resolver((of)=>UserType)
export class UserResolver{
constructor(private userService: UserService){}

    @Mutation((returns)=>UserType)
    signup(@Args('input') input:UserInput){
        return this.userService.signup(input);
        }
    

    

    @Mutation(returns=>SigninResponse)
    signin(@Args('input') input:UserInput){
        return this.userService.signin(input);
    }



    @Query((returns)=>UserType)
    @UseGuards(GQLAuthGuards)
    profile(@GetUser() user:UserEntity){
        return user;
    }
}


