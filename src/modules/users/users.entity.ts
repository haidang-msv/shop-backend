import { Entity, Unique, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@Unique(['Email', 'UserCode'])
export class UsersEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 50 })
  Email: string;

  @Column({ type: 'varchar', length: 50 })
  UserCode: string;

  @Column({ type: 'nvarchar', length: 200 })
  UserPass: string;

  @Column({ type: 'varchar', length: 50 })
  UserRole: string;

  @Column({ type: 'nvarchar', length: 200 })
  Address: string;

  @Column({ type: 'nvarchar', length: 200 })
  Photo: string;

  @Column({ type: 'nvarchar', length: 200 })
  AccountType: string;

  @Column({ type: 'bit' })
  IsActive: boolean;

  @Column({ type: 'nvarchar', length: 200 })
  ActiveCode: string;

  @Column({ type: 'datetime' })
  ExpiredCode: Date;

  @Column({ type: 'datetime' })
  CreatedDate: Date;

  @Column({ type: 'datetime' })
  EditedDate: Date;
}

// Id bigint identity(1,1) primary key
// , Email varchar(50) not null unique
// , UserCode varchar(50) not null unique
// , UserPass nvarchar(200) null --hashed
// , UserRole varchar(50) default('')
// , [Address] nvarchar(200) default('')
// , Photo nvarchar(200) default('')
// , AccountType nvarchar(200) default('')--local,gg,github
// , IsAcctive bit default(0)
// , ActiveCode nvarchar(200) default('')
// , ExpiredCode datetime
