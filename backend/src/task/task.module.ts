import { UserModule } from './../user/user.module';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), UserModule],
  controllers: [],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
