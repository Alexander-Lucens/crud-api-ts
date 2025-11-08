import request from 'supertest';
import requestListener from '../app.js';
import * as db from '../db/localMemoryDB.js';
import { User } from '../models/userModel.js';

beforeAll(async () => {
	await db.deleteAllUsers();
});

afterAll(async () => {
	await db.deleteAllUsers();
});

const user : Omit<User, "id"> = {  
	username: "TEST",
	age: 93,
	hobbies: ["Hiking", "Diving", "Programming"]
};

describe('POST /api/users TESTS', () => {
	it('should return 201 for valid data', async () => {
		const res = await request(requestListener).post('/api/users').send(user);
		
		expect(res.statusCode).toBe(201);
		expect(res.body.username).toEqual("TEST");
		expect(res.body.age).toBe(93);
		const hobby = res.body.hobbies;
		expect(hobby[0]).toEqual("Hiking");
		expect(hobby[1]).toEqual("Diving");
		expect(hobby[2]).toEqual("Programming");
	});

	it('should return 400 for invalid data', async () => {
		const res = await request(requestListener)
			.post(`/api/users`)
			.send({
				username: "Error Could Be",
				age: 66
			});

		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual("Request body does not contain required fields");
	});
});
