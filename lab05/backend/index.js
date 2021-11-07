const express = require("express");
const app = express();
const games = require("./games");
require("dotenv").config();

app.use(express.json());
app.use("/games", games);

const client = require("./config/redisClient");

client.on("error", err => {
    console.error("Error connecting to Redis", err);
    if (err.code === "ECONNREFUSED") {
        client.quit();
    }
});
client.on("connect", () => {
    console.log(`Connected to Redis.`)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log(`API server listening at http://localhost:${port}`);
    });
});
