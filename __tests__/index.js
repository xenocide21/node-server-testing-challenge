const supertest = require('supertest')
const server = require('../index')
const db = require('../data/config')

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('Cars Integration Tests', () => {
    it('GET / is the server running', async () => {
        const res = await supertest(server).get('/')
        expect(res.statusCode).toBe(200)
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.body.message).toBe('Welcome to my cars API')
    })
    it('GET /cars is the cars endpoint working', async () => {
        const res = await supertest(server).get('/cars')
        expect(res.statusCode).toBe(200)
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.body).toHaveLength(3)
        expect(res.body[0].Make).toBe('Jeep')
    })
    it('GET /cars/:id is the findById function working', async () => {
        const res = await supertest(server).get('/cars/3')
        expect(res.statusCode).toBe(200)
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.body.Model).toBe('CRV')
        expect(res.body.id).toBe(3)
    })
    it('POST /cars does the add function work', async () => {
        const res = await supertest(server)
            .post('/cars')
            .send({
                Year: 2003,
                Make: 'Pontiac',
                Model: 'Vibe'
            })
        expect(res.statusCode).toBe(201)
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.body.id).toBeDefined()
        expect(res.body.Make).toBe('Pontiac')
    })
    it('PUT /cars/:id does the update function work', async () => {
        const res = await supertest(server)
            .put('/cars/1')
            .send({
                Year: 1987,
                Make: 'Jeep',
                Model: 'Cherokee Laredo'
            })
        expect(res.statusCode).toBe(200)
        expect(res.body.Model).toBe('Cherokee Laredo')
    })
    it('DEL /cars/:id does the delete function work', async () => {

    })
})