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
    const game = await client.get(key)
    return res.json({game});
});

router.post('/', async (req, res) => {
    const key = req.body.key
    client.setex(key, 300, "01 02 03 04 05 06 07 08 09")
    return res.json(req.body);
});

router.post('/:key', async (req, res) => {
    const key = req.params.key
    const game = req.body.game
    client.setex(key, 300, game)
    return res.json(req.body);
});

router.delete('/', async (req, res) => {
    const key = req.body.key
    const games = await client.del(key)
    return res.json({games});
});

module.exports = router;
