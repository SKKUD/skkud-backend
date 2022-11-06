const request = require('supertest');
const app = require('../index');


// beforeAll(async () => {
//     await sequelize.sync(); // 가짜 ORM 생성
//  });
/*describe('그룹 테스트 설명 문자열', () => {
    const a = 1, b = 2; // 테스트에 사용할 일회용 가짜 변수 선언
  
    test('개별 테스트 설명 문자열', () => {
       expect(검증대상).toXxx(기대결과);
    });
 });
 */

let postid ='6367d457478beec28f8e9026'; //test 할 post id
let userid ='63679b5813a77d53463e4c16';

 // 게시물 전체 가져오기
describe('GET /posts', () => {
    test('게시물 가져오기',  (done) => {
        request(app)
        .get('/posts')
        .expect(200, done);
    });
});

//게시물 아이디로 가져오기
describe('GET /posts/id', () => {
    test('게시물 아이디로 가져오기',  (done) => {
        request(app)
        .get(`/posts/${postid}`)
        .expect(200, done);
    });
});

//게시물 만들기
describe('Post /posts/', () => {
    test('게시물 만들기',  (done) => {
        request(app)
        .post('/posts')
        .send({
            title: 'Test Post',
            body: 'Jest testing post body',
            tags: 'test',
        })
        .expect(200, done);
    });
});

//게시물 업데이트
describe('Post /posts/id', () => {
    test('게시물 업데이트',  (done) => {
        request(app)
        .patch(`/posts/${postid}`)
        .send({
            title: 'Test update a Post',
            body: 'Jest update testing post body',
            tags: 'test',
        })
        .expect(200, done);
    });
});

//게시물 삭제
// describe('Post /posts/id', () => {
//     test('게시물 삭제',  (done) => {
//         request(app)
//         .delete(`/posts/${postid}`)
//         .expect(200, done);
//     });
// });

// --- user test --- 

// user 전체 가져오기
describe('GET /users', () => {
    test('유저 가져오기', (done) => {
        request(app)
            .get('/users')
            .expect(200, done);
    });
});


// user id로 가져오기
describe('GET /users/id', () => {
    test('유저 id로 가져오기', (done) => {
        request(app)
            .get(`/users/${userid}`)
            .expect(200, done);
    });
});

//user 만들기
describe('User /user/', () => {
    test('유저 만들기',  (done) => {
        request(app)
        .post('/users')
        .send({
            userID: 'jmhee',
            username: '정명희',
            usernameEng: 'JoungMhee',
            passwd: '12345678',
            email:'jmhee3410@naver.com'
        })
        .expect(200, done);
    });
});

//user update
describe('User /users/id', () => {
    test('user 업데이트',  (done) => {
        request(app)
        .patch(`/users/${userid}`)
        .send({
            userID: 'jmhee3434',
            username: '정명희',
            usernameEng: 'JoungMhee',
            passwd: '12345678',
            email:'jmhee3410@naver.com'
        })
        .expect(200, done);
    });
});

//user 삭제
describe('User /users/id', () => {
    test('user 삭제',  (done) => {
        request(app)
        .delete(`/users/${userid}`)
        .expect(200, done);
    });
});