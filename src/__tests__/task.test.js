import chai from 'chai';
import chaiHTTP from 'chai-http';
import { describe, it } from 'mocha';
const { expect } = chai;
import app from '../App';

var project_id = 23;
var task_id = 44;
var taskData = {
    title: 'this is a new task',
}

describe('Testing Task endpoints', () => {

    describe("Testing add task route", () => {

        it('should return 400, Error Added Task', done => {
            chai.request(app).post('/api/v1/task/'+project_id).send({}).end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property("message");
                expect(res.body.message).to.equal("Error Adding Task");
                expect(res.body).to.have.property("error");
                expect(res.body.error).to.be.an('object');
                done();
            })
        });

        it('should add a task each time', done => {
            chai.request(app).post('/api/v1/task/'+project_id).send(taskData).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property("message");
                expect(res.body.message).to.equal("Added")
                expect(res.body).to.have.property("task");
                expect(res.body.task).to.be.an('object');
                done();
            });
        });
    });

    describe('testing getting task routes', () => {

        

    })

    
})
