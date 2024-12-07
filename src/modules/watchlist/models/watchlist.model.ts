import { Column, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

@Table
export class Watchlist extends Model {
  @Column
  user: User;

  @Column
  Name: string;

  @Column
  assetId: string;
}
