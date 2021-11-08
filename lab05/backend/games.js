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
    const games = await client.get(key)
    return res.json({games});
});

router.post('/', async (req, res) => {
    const key = req.body.key
    client.setex(key, 180, "000000000")
    return res.json(req.body);
});

router.post('/:key', async (req, res) => {
    const key = req.params.key
    const data = req.body.data
    client.setex(key, 180, data)
    return res.json(req.body);
});

router.delete('/', async (req, res) => {
    const key = req.body.key
    const games = await client.del(key)
    return res.json({games});
});

module.exports = router;
