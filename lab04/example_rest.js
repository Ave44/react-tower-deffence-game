// // Do zdefiniowania aplikacji użyjemy Express.js
const express = require('express');
const axios = require('axios')
const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        console.log(response.data)
        res.send(response.data)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
});

app.get('/users/:id', (req, res) => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)
    .then(response => {
        console.log(response.data)
        res.send(response.data)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
});

app.post('/users', (req, res) => {
    const newUser = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }
    console.log(req.body)
    console.log(newUser)
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
    .then(response => {
        console.log(response.data)
        res.send(response.data)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
