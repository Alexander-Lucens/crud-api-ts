import request from 'supertest';
import app from '../app.js';
import * as db from '../db/localMemoryDB.js';
beforeEach(async () => {
    await db.deleteAllUsers();
});
describe('GET /api/users tests', () => {
    it('should return 200 and an empty array', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
});
//# sourceMappingURL=users.test.js.map