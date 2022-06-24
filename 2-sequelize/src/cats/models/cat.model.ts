import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class Cat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  catId: number;

  @Column
  name: string;

  @Column
  breed: string;
}
