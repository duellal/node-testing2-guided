const Hobbits = require(`../hobbits/hobbits-model`)
const db = require(`../../data/dbConfig`)

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

test(`environment is testing`, () => {
 expect(process.env.NODE_ENV).toBe(`testing`)
})

describe(`getAll`, () => {
    test(`resolves all the hobbits in the hobbits table`, async () => {
        const result = await Hobbits.getAll()

        expect(result).toHaveLength(4)
        expect(result[0]).toMatchObject({name: `sam`})
        expect(result[1]).toMatchObject({name: `frodo`})
        expect(result[2]).toMatchObject({name: `pippin`})
        expect(result[3]).toMatchObject({name: `merry`})

    })
})

describe(`getById`, () => {
    test(`resolves hobbit by given id`, async () => {
        let result = await Hobbits.getById(1)
        
        expect(result).toMatchObject({name: `sam`})

        result = await Hobbits.getById(2)
        expect(result).toMatchObject({name: `frodo`})

        result = await Hobbits.getById(3)
        expect(result).toMatchObject({name: `pippin`})

        result = await Hobbits.getById(4)
        expect(result).toMatchObject({name: `merry`})
    })
})

describe(`insert`, () => {
    const bilbo = {name: `bilbo`}

    test(`resolves the newly created hobbit`, async () => {
        const result = await Hobbits.insert(bilbo)

        expect(result).toMatchObject(bilbo)
    })

    test(`adds hobbit to the Hobbits table`, async () => {
        await Hobbits.insert(bilbo)
        const records = await db(`hobbits`)

        expect(records).toHaveLength(5)
    })
})

describe(`update`, () => {

})

describe(`update`, () => {
    
})