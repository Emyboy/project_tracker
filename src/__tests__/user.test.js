import chai from 'chai';
import chaiHTTP from 'chai-http';
import { describe, it } from 'mocha';
const { expect } = chai;
import app from '../App';

chai.use(chaiHTTP);

const correctData = {
    username: 'testusername',
    email: 'test@gmail.com',
    password: 'test12345'
}
const withoutEmail = {
    username: 'testusername2',
    email: '',
    password: 'test12345'
}

const signupRoute = '/api/v1/signup';
const loginRoute = '/api/v1/login';
const userRoute = '/api/v1/user';

let token;
let user_id;
let user;

describe('testing signup endpoint', () => {

    it('should signup a user with no error', done => {
        chai.request(app).post(signupRoute)
            .send(correctData).end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Signup Success');
                expect(res.body.user).to.be.an('object');
                expect(res.body.user.id).to.be.a('number');
                done();
            })
    });

})

describe('testing signup duplication', () => {

    it('should return username already in use', done => {
        chai.request(app).post(signupRoute)
            .send(correctData).end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equal('username already in use');
                expect(res.body.error).to.be.an('object');
                expect(res.body.error.errors).to.be.an('array');
                done();
            })
    });

    it('should return email already in use', done => {
        chai.request(app).post(signupRoute)
            .send({ ...correctData, username: 'another_name' }).end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.equal('email already in use');
                expect(res.body.error).to.be.an('object');
                expect(res.body.error.errors).to.be.an('array');
                done();
            });
    })

});

describe('testing for empty fields', () => {

    it('should return email is empty', done => {
        chai.request(app).post(signupRoute)
            .send(withoutEmail).end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('email is empty');
                done();
            });
    });

});

describe('testing login enpont', () => {

    it('should return Icorrect email or password', done => {
        chai.request(app).get(loginRoute).send({ ...correctData, password: 'wrongPassword' })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Incorrect email or password');
                done();
            })
    });

    it('should return Icorrect email or password', done => {
        chai.request(app).get(loginRoute).send({ ...correctData, email: 'wrongPassword@mail.com' })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Incorrect email or password');
                done();
            })
    });

    it('should login a user and return user data', done => {
        chai.request(app).get(loginRoute).send(correctData).end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Login Success');
            expect(res.body.user).to.be.an('object');
            expect(res.body).to.have.property('token');
            token = res.body.token;
            user_id = res.body.user.id;
            user = res.body.user;
            done();
        })
    });

})

describe('testing user endpoint', () => {

    it('should return auth error', done => {
        chai.request(app).get(`${userRoute}/${user_id}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('authorization', token)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal("Unauthorized - Auth Error!");
                done();
            })
    });
    
    it('should return user data by user_id', done => {
        chai.request(app).get(`${userRoute}/${user_id}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('authorization', 'berere'+' '+token)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("id");
                expect(res.body.id).to.be.a('number');
                expect(res.body.username).to.equal(user.username);
                done();
            })
    });

});

describe("Testing update profile routes", () => {
    
    it("should return user's updated profile", done => {
        chai.request(app).put(`${userRoute}/${user_id}`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal("Unauthorized - Auth Error!")
            done();
        })
    });

    it("should return auth error", done => {
        chai.request(app).put(`${userRoute}/${user_id}`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('authorization', "bere"+ " "+token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            done();
        })
    })

})
