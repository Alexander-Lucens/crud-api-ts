import request from 'supertest';
import requestListener from '../app.js';
import * as db from '../db/localMemoryDB.js';
import { User } from '../models/userModel.js';

const user : Omit<User, "id"> = {  
	username: "TEST",
	age: 93,
	hobbies: ["Hiking", "Diving", "Programming"]
};

let usersID : string;

beforeAll(async () => {
	await db.deleteAllUsers();
	const x = await request(requestListener).post('/api/users').send(user);
	usersID = x.body.id;
});

afterAll(async () => {
	await db.deleteAllUsers();
});

describe('PATCH /api/users/:id TESTS', () => {

	it('should return 404 and error message', async () => {
		const validUUID = "f2d9c476-627f-4fa4-abee-3914adeb778a";
		const res = await request(requestListener)
			.patch(`/api/users/${validUUID}`)
			.send({
				username: "New Username",
				age: 10
			});
		expect(res.statusCode).toBe(404);
		expect(res.body.message).toEqual("Not Found");
	});

	it('should return 400 and error message', async () => {
		const invalidUUID = "f2d9c476";
		const res = await request(requestListener)
			.patch(`/api/users/${invalidUUID}`)
			.send({
				username: "New Username",
				age: 10
			});
		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual("Invalid userId");
	});

	it('should return 400 with erro', async () => {
		const res = await request(requestListener)
			.patch(`/api/users/${usersID}`)
			.send({
				username: "New Username",
				age: 10
			});

		expect(res.statusCode).toBe(200);
		expect(res.body.username).toEqual("New Username");
		expect(res.body.age).toBe(10);
	});
});
