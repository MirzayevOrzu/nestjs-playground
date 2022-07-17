import { ENUM } from 'sequelize';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Role } from '../../common/types/roles.enum';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  userId: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column(ENUM(Role.Admin, Role.User))
  role: string;
}
