/* eslint-disable prettier/prettier */


import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeORMConfiguration:TypeOrmModuleOptions={
    username:'root',
    password:'Vijay@007',
    port:3306,
    host:'localhost',
    type:'mysql',
    database:'vijay',

    entities:[__dirname + '/../**/*.entity.{ts,js}'],
    synchronize:false,

};