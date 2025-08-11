import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Database } from "@modules/database/database.entity";
import { log } from 'console';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Database) // inject Entity to Repository
    private readonly dbRepo:Repository<Database> // execute via repository
  ) {}

  async callStoredProcedureWithRepo(param1: string, param2:boolean=true): Promise<any> {
    let idNumber = parseInt(param1);
    if(Number.isNaN(idNumber)) idNumber=-1;
    log('🔨 >> DatabaseService >> callStoredProcedureWithRepo >> idNumber >>', idNumber);

    let directChild = param2 === true ? 1 : 0;
    log('DatabaseService >> callStoredProcedureWithRepo >> directChild >>', directChild);

    // giả sử db có store procedure [sp_Categories_Load]
    let sql = `exec sp_Categories_Load @CategoryId=${idNumber}, @DirectChild=${directChild}, @Lang='E'`;
    let r = await this.dbRepo.query(sql); /* or, another way:
    let sql = 'exec sp_Categories_Load $1, $2, $3'
    let r = await this.dbRepo.query(sql, [idNumber, directChild, 'E']);
    // */
    log('😼 >> DatabaseService >> callStoredProcedureWithRepo >> sql >>', sql);
    log('🚚 >> DatabaseService >> callStoredProcedureWithRepo >> r >>', r);

    return r;
  }

  async execQuery():Promise<any> {
    let sql = `select * from Users`;
    let r = await this.dbRepo.query(sql);
    return r;
  }

}