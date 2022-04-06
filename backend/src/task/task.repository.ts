/* eslint-disable prettier/prettier */

import { UserEntity } from './../user/user.entity';
import { query } from 'express';
import { SearchTaskDTO } from './dto/search.task.dto';
import { TaskStatus } from './task.enum';
import { CreateTaskDTO } from './dto/create.task.dto';
import { TaskEntity } from './task.entity';
import { EntityRepository, Repository } from "typeorm";
import { AuthGuard } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TaskInputType } from './types/task.input';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>{

   async getTasks(user:UserEntity,status:string){
        const query=this.createQueryBuilder('task');
if(status){
    query.andWhere('task.status=:status',{status:status});
}
        

            query.andWhere(`task.userId=:userId`,{userId:user.id});
        return await query.getMany();
    }


    async CreateTask(input:TaskInputType, user:UserEntity){
        const task =new TaskEntity();
        task.title=input.title;
        task.description=input.description;
     
        task.status=TaskStatus.OPEN;
        task.user=user;
        await task.save();
        delete task.user; 
        return task;
    }
}