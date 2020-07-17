const express = require('express')
const Cars = require('./cars-model')
const db = require('../data/config')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        res.json(await Cars.find())
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const car = await Cars.findById(req.params.id)
        if(!car) {
            return res.status(404).json({
                message: "Car not found"
            })
        }
        res.json(car)
    } catch (e) {
        next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const car = await Cars.add(req.body)
        res.status(201).json(car)
    } catch (e) {
        next(e)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        await db('Cars').where({id}).update(req.body)
        const cars = await db('Cars').where({id}).first()
        res.json(cars)
    } catch (e) {
        next(e)
    }
})

router.delete('/', async (req, res, next) => {
    try {
        const {id} = req.params
        await db('Cars').where({id}).del()
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

module.exports = router