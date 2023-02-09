import { Model, Table 	,Column} from 'sequelize-typescript'
@Table
export default class Role extends Model {
	@Column
	role!:string
	@Column
	role_name!:string
}
