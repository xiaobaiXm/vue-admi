import type { Context, Next } from 'koa'
import type { Rules, Values } from 'async-validator'
import Schema from 'async-validator'
export async function validate<T extends Values>(rules: Rules): Promise<{ data: T; error: any | nulll }> {
	const validator = new Schema(rules)
	let data = {}
	try {
		const res = await validator.validate(data)
		return {
			data: data as T,
			error: null
		}
	} catch (error) {
		return {
			data: data as T,
			error
		}
	}
}

export function validata(ctx: Context, next: Next) {}
