import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

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

  @Column
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
