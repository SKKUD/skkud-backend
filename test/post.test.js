const request = require('supertest');
const app = require('../index');

describe('POST /applies/appliers', () => {
  test('applier 생성', (done) => {
    request(app)
      .post('/applies/appliers')
      .send({
        title: '제목',
        introduction: '소개',
        questions: ['질문1', '질문2'],
      })
      .expect(403, done);
  });
});

describe('GET /applies/appliers', () => {
  test('applier가져오기', (done) => {
    request(app).get('/applies/appliers').expect(200, done);
  });
});

describe('PATCH /applies/appliers', () => {
  test('applier 수정', (done) => {
    request(app)
      .patch('/applies/appliers')
      .send({ title: '제목수정' })
      .expect(200, done);
  });
});

describe('DELETE /applies/appliers', () => {
  test('applier 삭제', () => {
    request('applier 삭제', (done) => {
      request(app).delete('/applies/appliers').expect(200, done);
    });
  });
});

// beforeAll(async () => {
//     await sequelize.sync(); // 가짜 ORM 생성
//  });
//jest
/*describe('그룹 테스트 설명 문자열', () => {
    const a = 1, b = 2; // 테스트에 사용할 일회용 가짜 변수 선언
  
    test('개별 테스트 설명 문자열', () => {
       expect(검증대상).toXxx(기대결과);
    });
 });
 */

const postid = '6367d457478beec28f8e9026'; //test 할 post id
const userid = '6367e4722aeb665b28f4e2f3';
const userID = 'jmhee';
const studyid = '636dee5a7d44c88c3674514a';
const studyGroupid = '636dece13ee7782e84583cee';

// 게시물 전체 가져오기
describe('GET /posts', () => {
  test('게시물 가져오기', (done) => {
    request(app).get('/posts').expect(200, done);
  });
});

//게시물 아이디로 가져오기
describe('GET /posts/id', () => {
  test('게시물 아이디로 가져오기', (done) => {
    request(app).get(`/posts/${postid}`).expect(200, done);
  });
});

//게시물 만들기
describe('Post /posts/', () => {
  test('게시물 만들기', (done) => {
    request(app)
      .post('/posts')
      .send({
        title: 'Test Post',
        body: 'Jest testing post body',
        tags: 'test',
        language: 'English',
      })
      .expect(200, done);
  });
});

//게시물 업데이트
describe('Post /posts/id', () => {
  test('게시물 업데이트', (done) => {
    request(app)
      .patch(`/posts/${postid}`)
      .send({
        title: 'Test update a Post',
        body: 'Jest update testing post body',
        tags: 'test',
        language: 'English',
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
    request(app).get('/users').expect(200, done);
  });
});

// user id로 가져오기
describe('GET /users/id', () => {
  test('유저 id로 가져오기', (done) => {
    request(app).get(`/users/${userid}`).expect(200, done);
  });
});

//user 만들기
describe('POST /user/', () => {
  test('유저 만들기', (done) => {
    request(app)
      .post('/users')
      .send({
        userID: 'jmhee',
        username: '정명희',
        usernameEng: 'JoungMhee',
        passwd: '12345678',
        email: 'jmhee3410@naver.com',
        role: 'Level1',
      })
      .expect(200, done);
  });
});

//user update
describe('PATCH /users/id', () => {
  test('user 업데이트', (done) => {
    request(app)
      .patch(`/users/${userID}`)
      .send({
        userID: 'jmhee3434',
        username: '정명희',
        usernameEng: 'JoungMhee',
        passwd: '1234qwer',
        email: 'jmhee3410@naver.com',
        role: 'Level1',
      })
      .expect(200, done);
  });
});

//user 삭제
describe('DELETE /users/id', () => {
  test('user 삭제', (done) => {
    request(app).delete(`/users/jmhee3434`).expect(200, done);
  });
});

// study 전체 가져오기
describe('GET /study/studies', () => {
  test('study 가져오기', (done) => {
    request(app).get('/study/studies').expect(200, done);
  });
});

//study 아이디로 가져오기
describe('GET /study/studies/id', () => {
  test('study 아이디로 가져오기', (done) => {
    request(app).get(`/study/studies/${studyid}`).expect(200, done);
  });
});

// study group 전체 가져오기
describe('GET /study/studyGroups', () => {
  test('study group 가져오기', (done) => {
    request(app).get('/study/studyGroups').expect(200, done);
  });
});

//studyGroup 아이디로 study 가져오기
describe('GET /study/studies/studyGroupid', () => {
  test('studyGroup 아이디로 study 가져오기', (done) => {
    request(app).get(`/study/studies/${studyGroupid}`).expect(200, done);
  });
});

// studyGroup 아이디로 studyGroup 가져오기
describe('GET /study/studyGroups/studyGroupid', () => {
  test('studyGroup 아이디로 study group 가져오기', (done) => {
    request(app).get(`/study/studyGroups/${studyGroupid}`).expect(200, done);
  });
});

//study 만들기
describe('POST /study/studies/studyGroupid', () => {
  test('study 만들기', (done) => {
    request(app)
      .post(`/study/studies/${studyGroupid}`)
      .send({
        title: 'test 스터디',
        content: 'test 스터디 내용',
        studyTime: '2022-11-22T00:00:00.000+00:00',
      })
      .expect(200, done);
  });
});

// study group 만들기
describe('POST /study/studyGroups', () => {
  test('study group 만들기', (done) => {
    request(app)
      .post(`/study/studyGroups`)
      .send({
        groupName: 'test 스터디그룹',
        members: ['test user'],
        studyDay: '화',
      })
      .expect(200, done);
  });
});

// study group update
describe('POST /study/studyGroups/studyGroupid', () => {
  test('study group 만들기', (done) => {
    request(app)
      .patch(`/study/studyGroups/637a36071897bc8219a8374a`)
      .send({
        groupName: 'test 스터디그룹',
        members: ['test user'],
        studyDay: '수',
      })
      .expect(200, done);
  });
});
