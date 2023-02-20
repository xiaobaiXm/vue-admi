import { Model, Table, Column } from 'sequelize-typescript'
@Table
export default class User extends Model {
  @Column
  username!: string
  @Column
  password!: string
  @Column
  real_name!: string
  @Column
  avatar!: string
  @Column
  desc?: string
  @Column
  home_path!: string
}
