import express from 'express'
import Restaurant from '../models/restaurantModel.js'
const router = new express.Router()

router.post('/restaurants', (req, res) => {
    const restaurant = new Restaurant(req.body)

    restaurant.save().then(() => {
        res.status(201).send(restaurant)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.patch('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if (!restaurant) {
            return res.status(404).send()
        }
        
        res.send(restaurant)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/restaurants/recommended', async (req, res) => {
    const restaurants = await Restaurant.find({ isRecommended: true })

    if (restaurants) {
        res.json(restaurants)
    } else {
        res.status(404)
        throw new Error('No recommended restaurant')
    }
})

router.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find({})

    if (restaurants) {
        res.json(restaurants)
    } else {
        res.status(404)
        throw new Error('No restaurant')
    }
})

export default router