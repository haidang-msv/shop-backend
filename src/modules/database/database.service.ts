import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseEntity } from "@db/database.entity";
import { log } from 'console';

@Injectable()
export class DatabaseService {
  constructor(@InjectRepository(DatabaseEntity) private readonly dbRepo:Repository<DatabaseEntity>) {}

  async callStoredProcedureWithRepo(param1: string, param2:boolean=true): Promise<any> {
    let idNumber = parseInt(param1);
    if(Number.isNaN(idNumber)) idNumber=-1;
    log('🔨 >> DatabaseService >> callStoredProcedureWithRepo >> idNumber >>', idNumber);

    let directChild = param2 === true ? 1 : 0;
    log('DatabaseService >> callStoredProcedureWithRepo >> directChild >>', directChild);

    let sql = `exec sp_Categories_Load @CategoryId=${idNumber}, @DirectChild=${directChild}, @Lang='E'`;
    log('😼 >> DatabaseService >> callStoredProcedureWithRepo >> sql >>', sql);

    let r = await this.dbRepo.query(sql);
    log('🚚 >> DatabaseService >> callStoredProcedureWithRepo >> r >>', r);

    return r;
  }
}