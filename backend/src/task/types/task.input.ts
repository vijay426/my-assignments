/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import { } from "class-validator";

@InputType()
export class TaskInputType{
    @Field()
    title:string
    @Field()
    description:string;

}