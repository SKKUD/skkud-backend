const request = require('supertest');
const { sequelize } = require('../models/Post');
const app = require('../index');

// beforeAll(async () => {
//     await sequelize.sync();
// });

describe('GET /posts', () => {
    test('게시물 수행',  (done) => {
        request(app)
        .get('/posts')
        .expect(200, done);
    });
});