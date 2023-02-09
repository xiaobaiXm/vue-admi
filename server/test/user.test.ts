import type { Server } from 'http'
import request from 'supertest'
import run from '../app'
describe('user', () => {
	let server: Server
	beforeAll(() => {
		server = run(3303)
	})
	it('POST /user/login', () => {
		return request(server).post('/user/login').expect(200).then(response => {
      
    })
	})
	afterAll(() => {
		server.close()
	})
})
