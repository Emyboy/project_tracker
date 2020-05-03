import chai from 'chai';
import chaiHTTP from 'chai-http';
import { describe, it } from 'mocha';
const { expect } = chai;
import app from '../App';
import AuthHelper from '../helpers/auth.helper';

chai.use(chaiHTTP);

const projectData = {
    name: 'Twitter Clone',
    description: 'this is a twitter clone due!!'
}
const token = AuthHelper.generateToken({ id: 1, email: 'test@gmail.com' });

describe('testing project end points', () => {

    describe("testing create project endpoint", () => {

        it('should return Unauthorized - Auth Error!', done => {
        chai.request(app).post('/api/v1/project/1').send(projectData)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.equal(401);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Unauthorized - Auth Error!');
                expect(res.body).to.be.an('object');
                done();
            })
        });

        it('should add a project each time', done => {
            chai.request(app).post('/api/v1/project/1').send(projectData).set('Content-Type', 'application/x-www-form-urlencoded')
            .set('authorization', 'berere'+' '+token).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Project Created');
                expect(res.body).to.have.property('project');
                expect(res.body.project).to.be.an('object');
                expect(res.body.project).to.have.property('id');
                expect(res.body.project.id).to.be.a('number');
                done();
            })
        })

    });

    describe('testing get all user project route', () => {
        
        it('should ')
    })
    

})
