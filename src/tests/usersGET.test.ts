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


describe('GET /api/users && /api/users/:id && /api/notexisted_way TESTS', () => {
	it('should return 200 and an array with one element', async () => {
		const res = await request(requestListener).get(`/api/users/${usersID}`);

		expect(res.statusCode).toBe(200);
		expect(res.body.username).toEqual("TEST");
		expect(res.body.age).toBe(93);
		const hobby = res.body.hobbies;
		expect(hobby[0]).toEqual("Hiking");
		expect(hobby[1]).toEqual("Diving");
		expect(hobby[2]).toEqual("Programming");
	});

	it('should return 404 and error message', async () => {
		const validUUID = "f2d9c476-627f-4fa4-abee-3914adeb778a";
		const res = await request(requestListener).get(`/api/users/${validUUID}`);
		expect(res.statusCode).toBe(404);
		expect(res.body.message).toEqual("Not Found");
	});

	it('should return 400 and error message', async () => {
		const invalidUUID = "f2d9c476";
		const res = await request(requestListener).get(`/api/users/${invalidUUID}`);
		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual("Invalid userId");
	});
	
	it('should return 404 and error message', async () => {
		const res = await request(requestListener).get(`/api/text`);
		expect(res.statusCode).toBe(404);
		expect(res.body.message).toEqual("Not Found");
	});

	it('should return 200 and an empty array', async () => {
		await db.deleteAllUsers();
		const res = await request(requestListener).get('/api/users');
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual([]);
	});
});
