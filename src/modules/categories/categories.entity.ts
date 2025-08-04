import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({type:'bigint'})
  ParentId: number

  @Column({ type: 'nvarchar', length: 200 })
  Ename: string;

  @Column({ type: 'nvarchar', length: 200 })
  Vname: string;

  @Column({ type: 'nvarchar', length: 200 })
  Jname: string;

  @Column({ type: 'nvarchar', length: 200 })
  Description: string;

  @Column({ type: 'nvarchar', length: 200 })
  Photo: string;

  @Column({ type: 'bit' })
  NoUsed: boolean;

  @Column({ type: 'datetime' })
  CreatedDate: Date;

  @Column({ type: 'datetime' })
  EditedDate: Date;
}

	
	// Id bigint identity(1,1) primary key
    // , ParentId bigint default(null)
	// , Ename nvarchar(200) not null
	// , Vname nvarchar(200) default('')
	// , Jname nvarchar(200) default('')
	// , [Description] nvarchar(200) default('')
	// , Photo nvarchar(200) default('')
	// , NoUsed bit default(0)
    // , CreatedDate datetime default(getdate())
    // , EditedDate datetime
