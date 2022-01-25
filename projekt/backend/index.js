const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const dbConnData = {
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'projekt'
};

const { Pool } = require('pg');
const client = new Pool(dbConnData);
console.log('Connection parameters: ');
console.log(dbConnData);

client
    .connect()
    .then(() => {
        client.query(`
            CREATE TABLE IF NOT EXISTS enemies (
            id SERIAL PRIMARY KEY,
            label VARCHAR UNIQUE NOT NULL,
            hp INT NOT NULL,
            maxHp INT NOT NULL,
            speed FLOAT NOT NULL,
            loss INT NOT NULL,
            armor FLOAT NOT NULL,
            magicResistance FLOAT NOT NULL,
            gold INT NOT NULL,
            img VARCHAR NOT NULL
            );
        
            CREATE TABLE IF NOT EXISTS towers (
            id SERIAL PRIMARY KEY,
            label VARCHAR UNIQUE NOT NULL,
            name VARCHAR NOT NULL,
            img VARCHAR NOT NULL,
            type VARCHAR NOT NULL,
            minDamage INT NOT NULL,
            maxDamage INT NOT NULL,
            speed INT NOT NULL,
            range INT NOT NULL,
            cost INT NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS upgrades (
            id SERIAL PRIMARY KEY,
            label1 VARCHAR NOT NULL,
            label2 VARCHAR NOT NULL,
            name VARCHAR NOT NULL,
            cost INT NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS levels (
            id SERIAL PRIMARY KEY,
            width INT NOT NULL,
            height INT NOT NULL,
            path VARCHAR NOT NULL,
            waves VARCHAR NOT NULL,
            gold INT NOT NULL
            );`
        );

        const port = 5000
        app.listen(port, () => {
            console.log(`API server listening at http://localhost:${port}`);
    });
    })
    .catch(err => console.error('Connection error', err.stack));


app.get('/towers', async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM towers");
        return res.send(result.rows);
    } catch (err) {
        return res.status(500).send(err)
    }
});

app.post('/towers', async (req, res) => {
    try {
        const tower  = req.body
        if(tower.label && tower.img && tower.name && tower.type) {
            const duplicate = await client.query(`SELECT * FROM towers WHERE label = '${tower.label}'`);
            if (duplicate.rows[0]) {
                return res.status(500).send("LABEL_DUPLICATE");
            }
            const insertedRow = await client.query(`INSERT INTO towers (label, name, img, type, minDamage, maxDamage, speed, range, cost)
            VALUES ('${tower.label}', '${tower.name}', '${tower.img}', '${tower.type}', '${tower.mindamage}',
            '${tower.maxdamage}', '${tower.speed}', '${tower.range}', '${tower.cost}') RETURNING *`);
            return res.send(insertedRow.rows[0]);
        }
        return res.status(500).send("MISSING_FIELDS");
    }
    catch (err) {
        return res.status(500).send(err)
    }
});

app.post('/towers/edit/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tower  = req.body
        if(tower.label && tower.img && tower.name && tower.type) {
            const duplicate = await client.query(`SELECT * FROM towers WHERE label = '${tower.label}'`);
            if (duplicate.rows.length > 1 ) {
                return res.status(500).send("LABEL_DUPLICATE");
            }
            if (duplicate.rows.length === 1 && duplicate.rows[0].id != id) {
                return res.status(500).send("LABEL_DUPLICATE");
            }
            const editedRow = await client.query(`UPDATE towers SET
            name = '${tower.name}', img = '${tower.img}', type = '${tower.type}', minDamage = '${tower.minDamage}', 
            maxDamage = '${tower.maxDamage}', speed = '${tower.speed}', range = '${tower.range}', cost = '${tower.cost}'
            WHERE id = '${id}' RETURNING *`);
            return res.send(editedRow.rows[0]);
        }
        return res.status(500).send("MISSING_FIELDS");
    }
    catch (err) {
        return res.status(500).send(err)
    }
});

app.delete('/towers/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // const deletedConnections = await client.query(`DELETE FROM towers WHERE songId=${id} RETURNING *`);
        const deletedRow = await client.query(`DELETE FROM towers WHERE id=${id} RETURNING *`);
        return res.send({tower: deletedRow.rows[0]   })//, connections: deletedConnections.rows});
    }
    catch (err) {
        return res.status(500).send(err)
    }
});
