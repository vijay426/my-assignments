/* eslint-disable prettier/prettier */
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfiguration } from './config/typeorm.config';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TaskModule, 
    UserModule, 
    TypeOrmModule.forRoot(TypeORMConfiguration),
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile:true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
