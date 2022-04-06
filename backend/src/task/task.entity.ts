/* eslint-disable prettier/prettier */

import { UserEntity } from './../user/user.entity';
import { AuthGuard } from '@nestjs/passport';

import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.enum";
@Entity('Task')
export class TaskEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    description:string;
    @Column()
    status:TaskStatus;

    @ManyToOne((type)=>UserEntity,(user)=>user.task,{eager:false})
    user:UserEntity;

    @Column()
    userId:number;
}
