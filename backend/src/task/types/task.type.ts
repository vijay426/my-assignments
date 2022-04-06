/* eslint-disable prettier/prettier */

import { Field, ID } from '@nestjs/graphql';

import { ObjectType } from "@nestjs/graphql";




@ObjectType('Task')
export class TaskType{
    @Field((type)=>ID)
    id:number;
    @Field()
    title:string;
    @Field()
    description:string;

    @Field()
    status:string;

}