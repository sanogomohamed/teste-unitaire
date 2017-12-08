const express = require('express')
const router = express.Router()
const BadRequestError = require('../errors/bad-request')
const NotFoundError = require('../errors/not-found')
const { find } = require('lodash')

const db = require('../data/db')
const courseListCollection = db.courseList
/*
 POST courseList
*/
router.post('/', (req, res, next) => {
  if (!req.body.name) {
    return next(new BadRequestError('VALIDATION', 'Missing name'))
  }

  const name = req.body.name

  // Check for name uniqueness
  const result = find(courseListCollection, { name })
  if (result) {
    return next(new BadRequestError('VALIDATION', 'Name should be unique'))
  }

  const newCourseList = {
    id: courseListCollection.length + 1,
    name
  }

  courseListCollection.push(newCourseList)

  res.json({
    data: newCourseList
  })
})

/*
 Delete courseList
*/
router.delete('/', (req, res, next) => {
  if (!req.body.id) {
    return next(new BadRequestError('VALIDATION', 'Missing id'))
  }

  const newCourseList = {
    id: courseListCollection.length - 1,
    name
  }

  courseListCollection.splice(newCourseList, 1)

  res.json({
    data: newCourseList
  })
})

/*
 GET courseList
*/
router.get('/', (req, res, next) => {

  const result = find(courseListCollection)
  if (!req.result) {
    return next(new NotFoundError('VALIDATION', 'NOT find course list'))
  }

  res.json({
    data: newCourseList
  })
})

/*
 PUT courseList
*/
router.put('/', (req, res, next) => {
  if (!req.body.name) {
    return next(new BadRequestError('VALIDATION', 'Missing name'))
  }

  const name = req.body.name

  // Check for name uniqueness
  const result = find(courseListCollection, { name })
  if (result) {
    return next(new BadRequestError('VALIDATION', 'Name should be unique'))
  }

  const newCourseList = {
    id: courseListCollection.length + 1,
    name
  }

  courseListCollection.push(newCourseList)

  res.json({
    data: newCourseList
  })
})

module.exports = router