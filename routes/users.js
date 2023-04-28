const express = require('express')
const router = express.Router()

const UserTable = require('../models/user')

router.get('/users', async (req, res) => {
    // console.log('Get Request')
    // res.send('Get Request')

    try {
        const usersdata = await UserTable.find()
        res.json(usersdata)
    } catch (e) {
        res.send('Get Request')
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const a1 = await UserTable.findById(req.params.id)
        res.json(a1)
    } catch (err) {
        res.send('Error ' + err)
    }
})


// Create a new user
router.post('/users', async (req, res) => {
    const { name, tech, sub } = req.body;

    try {
        const user = new UserTable({ name, tech, sub });
        await user.save();
        res.send(user);
        console.log('posted')
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


router.put('/users/:id', async (req, res) => {
    try {
        const n1 = await UserTable.findById(req.params.id)
        n1.name = req.body.name
        n1.tech = req.body.tech
        n1.sub = req.body.sub

        const n2 = await n1.save()
        res.json(n2)
    } catch (err) {
        res.send('Error'+err)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const a1 = await UserTable.findById(req.params.id)
        await UserTable.deleteOne(a1)
        res.json(a1)
    } catch (err) {
        res.send('Error ' + err)
    }
})

module.exports = router