import { Entity, Unique, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RestaurantsEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'nvarchar', length: 200 })
  Ename: string;

  @Column({ type: 'nvarchar', length: 200 })
  Vname: string;

  @Column({ type: 'nvarchar', length: 200 })
  Jname: string;

  @Column({ type: 'nvarchar', length: 200 })
  Address: string;

  @Column({ type: 'nvarchar', length: 200 })
  Description: string;

  @Column({ type: 'nvarchar', length: 200 })
  Phone: string;

  @Column({ type: 'nvarchar', length: 200 })
  Email: string;

  @Column({ type: 'nvarchar', length: 200 })
  Rating: string;

  @Column({ type: 'nvarchar', length: 200 })
  Photo: string;

  @Column({ type: 'datetime' })
  CreatedDate: Date;

  @Column({ type: 'datetime' })
  EditedDate: Date;
}

// Id bigint identity(1,1) primary key
// , Ename nvarchar(200) not null
// , Vname nvarchar(200) default('')
// , Jname nvarchar(200) default('')
// , [Address] nvarchar(200) default('')
// , [Description] nvarchar(200) default('')
// , Phone nvarchar(200) default('')
// , Email nvarchar(200) default('')
// , Rating nvarchar(200) default('')
// , Photo nvarchar(200) default('')
// , NoUsed bit default(0)
