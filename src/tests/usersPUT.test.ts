import request from 'supertest';
import requestListener from '../app.js';
import * as db from '../db/localMemoryDB.js';
import { User } from '../models/userModel.js';

const user : Omit<User, "id"> = {  
	username: "TEST",
	age: 93,
	hobbies: ["Hiking", "Diving", "Programming"]
};

const putUser : Omit<User, "id"> = {  
	username: "PUT",
	age: 16,
	hobbies: ["Movies"]
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

describe('PUT /api/users/:id TESTS', () => {

	it('should return 404 and error message', async () => {
		const validUUID = "f2d9c476-627f-4fa4-abee-3914adeb778a";
		const res = await request(requestListener).put(`/api/users/${validUUID}`).send(putUser);
		expect(res.statusCode).toBe(404);
		expect(res.body.message).toEqual("Not Found");
	});

	it('should return 400 and error message', async () => {
		const invalidUUID = "f2d9c476";
		const res = await request(requestListener).put(`/api/users/${invalidUUID}`).send(putUser);
		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual("Invalid userId");
	});

	it('should return 400 with erro', async () => {
		const res = await request(requestListener)
			.put(`/api/users/${usersID}`)
			.send({
				username: "New Username",
				age: 10
			});

		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual("Request body does not contain required fields");
	});

	it('should return 200 with updated values', async () => {
		const res = await request(requestListener).put(`/api/users/${usersID}`).send(putUser);

		expect(res.statusCode).toBe(200);
		expect(res.body.username).toEqual("PUT");
		expect(res.body.age).toBe(16);
		const hobby = res.body.hobbies;
		expect(hobby[0]).toEqual("Movies");
	});
});
