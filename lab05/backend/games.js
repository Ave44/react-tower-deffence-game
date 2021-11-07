const express = require('express');
const cors = require('cors')
const { default: redis } = require('ioredis/built/redis');
const router = express.Router();
const client = require('./config/redisClient');

router.use(cors())

router.get('/', async (req, res) => {
    const games = await client.keys('*')
    return res.json({games});
});

router.get('/:key', async (req, res) => {
    const key = req.params.key
    console.log(key)
    const games = await client.get(key)
    return res.json({games});
});

router.post('/', async (req, res) => {
    const key = "123"
    const data = "000000000"
    client.setex(key, 180, data)
    return res.json(req.body);
});

router.delete('/', async (req, res) => {
    const key = "game"
    const games = await client.del(key)
    return res.json({games});
});

module.exports = router;
