import chai from 'chai';
import chaiHTTP from 'chai-http';
import { describe, it } from 'mocha';
const { expect } = chai;
import app from '../App';
import authHelper from '../helpers/auth.helper';

var project_id = 23;
var rawToken = authHelper.generateToken({ email: 'test@gmail.com', id: 1 });
var addedTask;
var taskData = {
    title: 'this is a new task',
}

describe('Testing Task endpoints', () => {

    describe("Testing add task route", () => {

        it('should return 400, Error Added Task', done => {
            chai.request(app).post('/api/v1/task/'+project_id).set('Content-Type', 'application/x-www-form-urlencoded').set('authorization', token).send({}).end((err, res) => {
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
            chai.request(app).post('/api/v1/task/'+project_id).set('Content-Type', 'application/x-www-form-urlencoded').set('authorization', token).send(taskData).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property("message");
                expect(res.body.message).to.equal("Added")
                expect(res.body).to.have.property("task");
                expect(res.body.task).to.be.an('object');
                addedTask = res.body.task;
                done();
            });
        });
    });

    describe('testing getting task routes', () => {

        it('should return 404 not found', done => {
            chai.request(app).get('/api/v1/task/207').set('Content-Type', 'application/x-www-form-urlencoded').set('authorization', token).end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('No Task Found');
                expect(res.body).to.have.property('tasks');
                expect(res.body.tasks).to.be.an('array');
                done();
            })
        })

        it('should return all tasks for a project', done => {
            chai.request(app).get('/api/v1/task/'+project_id).set('Content-Type', 'application/x-www-form-urlencoded').set('authorization', token).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body[0].id).to.be.a('number');
                expect(res.body[0].id).to.equal(addedTask.id);
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0].title).to.equal(addedTask.title);
                done();
            })
        })
    });

    describe('testing edit and delete task route', () => {

        it('should edit a task each time', done => {
            chai.request(app).put('/api/v1/task/'+addedTask.id).set('Content-Type', 'application/x-www-form-urlencoded').set('authorization', token).send({ title: 'I just changed the title'}).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Saved');
                expect(res.body).to.have.property('editedTask');
                expect(res.body.editedTask).to.be.an('array');
                expect(res.body.editedTask[0]).to.equal(1);
                done();
            })
        });

        it('should delete a task each time', done => {
            chai.request(app).delete('/api/v1/task/'+addedTask.id).set('Content-Type', 'application/x-www-form-urlencoded').set('authorization', token).end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Deleted');
                expect(res.body).to.have.property('deletedTask');
                expect(res.body.deletedTask).to.equal(1);
                done();
            })
        })

    })

    
})
