import { UserEntity } from './../user/user.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDTO } from './dto/create.task.dto';
import { SearchTaskDTO } from './dto/search.task.dto';
import { TaskStatus } from './task.enum';
import { AuthGuard } from '@nestjs/passport';

/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskInputType } from './types/task.input';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository,
    ){}
    async getTasks( user:UserEntity,status:string){
        return this.taskRepository.getTasks(user,status);
    }
    async createTask(input:TaskInputType, user:UserEntity){

        return this.taskRepository.CreateTask(input,user);
    }
async getTaskById(id:number){
    const task= await this.taskRepository.findOne(id);
    if(!task){
        throw new NotFoundException('task not found');
    }
    return task;
}
        async updateTaskStatus(id:number,status:TaskStatus){
            const task=await this.getTaskById(id);
            task.status=status;
            await task.save();
            return task;


        }
    async deleteTask(id:number){
        const result=await this.taskRepository.delete(id);
        if(result.affected==0){
            throw new NotFoundException('task not found')
        }

        return result;
    }

}
