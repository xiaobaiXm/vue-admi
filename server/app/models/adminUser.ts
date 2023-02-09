import { Model, Table, Column, BelongsTo } from 'sequelize-typescript'
import Role from './role'
@Table
export default class AdminUser extends Model {
	@BelongsTo(() => Role, {
		targetKey: 'id',
		foreignKey: 'id',
		as: 'role'
	})
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
