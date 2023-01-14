const db = require(`../data/dbConfig`)
const request = require(`supertest`)
const server = require(`./server`)

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe(`[GET] /hobbits`, () => {
    test(`responds with 200 OK`, async () => {
        const res = await request(server).get(`/hobbits`)

        expect(res.status).toBe(200)
    })

    test(`responds with all hobbits`, async () => {
        const res = await request(server).get(`/hobbits`)

        expect(res.body).toHaveLength(4)
        
    })
})

describe(`[POST] /hobbits`, () => {
    const bilbo = {name: `bilbo`}
    test(`adds new hobbit to the db`, async () => {
        await request(server).post(`/hobbits`).send(bilbo)

        expect(await db(`hobbits`)).toHaveLength(5)
    })

    test(`responds with the hobbit added`, async () => {
        const res = await request(server).post(`/hobbits`).send(bilbo)
        
        expect(res.body).toMatchObject(bilbo)
    })
})