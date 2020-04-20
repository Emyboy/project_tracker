import chai from 'chai';
import chaiHTTP from 'chai-http';
import { describe, it } from 'mocha';
const { expect } = chai;
import app from '../App';

chai.use(chaiHTTP);

const projectData = {
    name: 'Twitter Clone',
    description: 'this is a twitter clone due!!'
}

describe('testing project end points', () => {

    describe("testing add project endpoint", () => {

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

    })

})
