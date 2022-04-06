/* eslint-disable prettier/prettier */

import { TaskEntity } from './../task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseEntity } from "typeorm";
import * as crypto from 'crypto-js';
import { type } from 'os';
@Entity('User')
@Unique(['username'])
 export class UserEntity extends BaseEntity{
     @PrimaryGeneratedColumn()
     id:number;

     @Column()
     username:string;

     @Column()
     password:string;

     @OneToMany((type)=>TaskEntity,(task)=>task.user,{eager:true})
     task:TaskEntity[];

     async validatePassword(password:string){
         const encrypted=`${crypto.MD5(this.password)}`;
         return encrypted==this.password;

         
     }
 }