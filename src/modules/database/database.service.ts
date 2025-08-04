import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
/*
2. Using EntityManager (for more control or when not tied to a specific entity):
Inject the Connection object from TypeORM into your service or controller.
Create a QueryRunner from the Connection.
Execute the stored procedure using queryRunner.query().
Remember to release the QueryRunner after use to free up the database connection.
*/
@Injectable()
export class DataService {
  constructor(private readonly connection: Connection) {}

  async callStoredProcedureWithEntityManager(param1: string): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      // Assuming 'my_stored_procedure' takes one parameter
      const result = await queryRunner.query('exec my_stored_procedure(?)', [param1]);
      return result;
    } finally {
      await queryRunner.release();
    }
  }
}