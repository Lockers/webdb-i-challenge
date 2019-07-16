const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

getAll = () => {
    return db('accounts');   
}
getAccountById = (id) => {
    return db('accounts').where({ id });
}
addAccount = ({name, budget}) => {
    return db('accounts').insert({ name, budget });
}
updateAccount = (id, {name, budget}) => {
    return db('accounts').where({id}).update({name, budget})
}
deleteAccount = (id) => {
    return db('accounts').where({id}).del()
}

server.get('/accounts', (req, res) => {
    getAll()
        .then(response => {
        res.status(200).json(response)
        })
        .catch(error => {
        res.status(500).json({Error: 'Internal Server Error'})
    })
})

server.get('/accounts/:id', (req, res) => {
    getAccountById(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({ Error: 'Internal Server Error' })
        })
})

server.post('/accounts', (req, res) => {
    addAccount(req.body)
        .then(response => {
        res.status(201).json(response)
        })
        .catch(error => {
        res.status(500).json({Error: 'Internal Server Error'})
    })
})

server.put('/accounts/:id', (req, res) => {
    updateAccount(req.params.id, req.body)
        .then(response => {
        res.status(200).json(response)
        })
        .catch(error => {
        res.status(500).json({Error: 'Internal Server Error'})
    })
})

server.delete('/accounts/:id', (req, res) => {
    deleteAccount(req.params.id)
        .then(response => {
        res.status(204).json(response)
        })
        .catch(error => {
        res.status(500).json({Error: 'Internal server Error'})
    })
})

module.exports = server;