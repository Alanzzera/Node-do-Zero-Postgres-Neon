// import { createServer } from 'node:http'

// const server = createServer((req, res) => {
//     res.write('oi')
//     return res.end()
// })

// server.listen(3333)

// Framework
import { fastify } from 'fastify';
// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (req, res) => {

    const { title, description, duration } = req.body

    await database.create({
        title,
        description,
        duration
    })
    return res.status(201).send()
})

server.get('/videos', async (res) => {
    const search= res.query.search
    const videos = database.list(search)
    return videos
})

server.put('/videos/:id', (req, res) => {
    const videosId = req.params.id
    const { title, description, duration } = req.body
    database.update(videosId, {
        title,
        description,
        duration
    })
    return res.status(204).send
})

server.delete('/videos/:id', (req, res) => {
    const videosId = req.params.id
    database.delete(videosId)
    return res.status(204).send
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})
