const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
chai.should()


const { find } = require('lodash')

const db = require('../../data/db')
const app = require('../../app')

const courseListFixture = require('../fixtures/courseList')

/*
Test CourselistController
*/
describe('CourselistController', () => {
  beforeEach(() => { courseListFixture.up() })
  afterEach(() => { courseListFixture.down() })

  /*
  POST: create courseList
  */
  describe('When I create a courseList (POST /course-lists)', () => {
    it('should reject with a 400 when no name is given', () => {
      return request(app).post('/course-lists').then((res) => {
        res.status.should.equal(400)
        res.body.should.eql({
          error: {
            code: 'VALIDATION',
            message: 'Missing name'
          }
        })
      })
    })

    it('should reject when name is not unique', () => {
      return request(app)
        .post('/course-lists')
        .send({ name: 'Toto' })
        .then((res) => {
          res.status.should.equal(400)
          res.body.should.eql({
            error: {
              code: 'VALIDATION',
              message: 'Name should be unique'
            }
          })
      })
      
    })

    it('should  succesfuly create a courseList', () => {
      const mockName = 'My New List'

      return request(app)
        .post('/course-lists')
        .send({ name: mockName })
        .then((res) => {
          res.status.should.equal(200)
          expect(res.body.data).to.be.an('object')
          res.body.data.name.should.equal(mockName)

          const result = find(db.courseList, { name: mockName } )
          result.should.not.be.empty
          result.should.eql({
            id: res.body.data.id,
            name: res.body.data.name
            
          })
        })
    })
  })

  /*
  DELETE : courseList
  */
  describe('When I delete a courseList (DELETE /:id course-lists)', () => {
    it('should reject with a 400 when no id is given', () => {
      return request(app).delete('/course-lists').then((res) => {
        res.status.should.equal(400)
        res.body.should.eql({
          error: {
            code: 'VALIDATION',
            message: 'Missing id'
          }
        })
      })
    }) 
    it('should  succesfuly delete a courseList', () => {
    return request(app)
       const mockId = {id:1}
      .delete('/course-lists' + db.courseList.mockId)
      .then((res) => {
        res.status.should.equal(200)
        expect(res.body.data).to.be.an('object')
      })
    })
  })

   /*
  GET: ALL courseList
  */
  describe('When I get a courseList (GET /course-lists)', () => {
    it('should reject with a 404 when no resource is find', () => {
      return request(app).get('/course-lists').then((res) => {
        res.status.should.equal(404)
        res.body.should.eql({
          error: {
            code: 'VALIDATION',
            message: 'NOT find course list'
          }
        })
      })
    })

    it('should  succesfuly when courseList is GET', () => {

      return request(app) 
        const result = find(db.courseList)
        .get('/course-lists')
        .then((res) => { 
          res.status.should.equal(200)
          expect(res.body.data).to.be.an('object')
          result.should.not.be.empty
          result.should.eql({
            id: res.body.data.id,
            name: res.body.data.name
          })
        })
    })
  })

    /*
  PuT: Update courseList
  */
  describe('When I put a courseList (PUT /course-lists)', () => {
    it('should reject with a 400 when no name is given', () => {
      return request(app).put('/course-lists').then((res) => {
        res.status.should.equal(400)
        res.body.should.eql({
          error: {
            code: 'VALIDATION',
            message: 'Missing name'
          }
        })
      })
    })

   it('should reject when name is not unique', () => {
     return request(app)
       .put('/course-lists')
       .send({ name: 'Toto' })
       .then((res) => {
         res.status.should.equal(400)
         res.body.should.eql({
           error: {
             code: 'VALIDATION',
             message: 'Name should be unique'
           }
         })
     })
   })

   it('should  succesfuly create a courseList', () => {
     return request(app)
      const mockName = 'Momo'
       .put('/course-lists'+ db.courseList.name)
       .send({ name: mockName })
       .then((res) => {
         res.status.should.equal(200)  
         expect(res.body.data).to.be.an('object')
         res.body.data.name.should.equal(mockName)

         const result = find(db.courseList, { name: mockName } )
         result.should.not.be.empty
         result.should.eql({
           id: res.body.data.id,
           name: res.body.data.name
         })
       })
   })
  })

   /*
  GET: One courseList
  */
  describe('When I get a courseList (GET /:id course-lists)', () => {
    it('should reject with a 404 when id of resource is no given', () => {
      return request(app).get('/course-lists').then((res) => {
        res.status.should.equal(404)
        res.body.should.eql({
          error: {
            code: 'VALIDATION',
            message: 'NOT find course list'
          }
        })
      })
    })

    it('should  succesfuly when courseList is GET', () => {

      return request(app) 
        const result = find(db.courseList.id)
        .get('/course-lists'+result)
        .then((res) => { 
          res.status.should.equal(200)
          expect(res.body.data).to.be.an('object')
          result.should.not.be.empty
          result.should.eql({
            id: res.body.data.id,
            name: res.body.data.name
          })
        })
    })
  })
})
