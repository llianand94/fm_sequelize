const request = require('supertest')
const yup = require('yup')
const { response } = require('../app')
const app = require('../app')
const db = require('../models')
const appRequest = request(app)

const getUserDate = () => ({
  firstName: 'Testfn',
  lastName: 'Testln',
  email: `test${Date.now()}@test.test`,
  password: 'test',
  birthday: '2000-01-01',
  isMale: false
})

const user = getUserDate()
beforeAll(() => {
  return db.sequelize.sync({ force: true })
})
afterAll(() => {
  return db.sequelize.close()
})

const schemaPOSTUser = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  birthday: yup.string().required(),
  isMale: yup.boolean()
})
const schemaResponseSuccess = yup.object({
  data: yup.array().of(schemaPOSTUser)
})

describe('create user', () => {
  test('user create  POST successfully expect 201 ', async () => {
    const response = await appRequest.post('/api/users/').send(user)
    expect(response.statusCode).toBe(201)
  })
  expect(schemaResponseSuccess.isValidSync(response.body)).toBe(true)
  test('create empty user POST expect 400', async () => {
    const response = await appRequest.post('/api/users/').send({})
    expect(response.statusCode).toBe(400)
  })
  test('create exists user POST expect 400', async () => {
    const response = await appRequest.post('/api/users/').send(user)
    expect(response.statusCode).toBe(409)
  })
})

describe('get user/users', () => {
  test('all users  GET  expect 200 ', async () => {
    const response = await appRequest.get('/api/users/')
    expect(response.statusCode).toBe(200)
  })
  test('one user  GET  expect 200 ', async () => {
    const response = await appRequest.get('/api/users/10')
    expect(response.statusCode).toBe(200)
  })
})
