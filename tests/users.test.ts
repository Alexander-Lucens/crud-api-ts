import request from 'supertest';
import app from '../src/app.js';
import * as db from '../src/db/localMemoryDB.js';

beforeEach(async () => {
	await db.deleteAllUsers();
});

describe('GET /api/users tests', () => {
	it('should return 200 and an empty array', async () => {
		const response = await request(app as any).get('/api/users');
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual([]);
	});

});
