const express = require('express')
const passport = require('passport')
const { upadateTrip, deleteTrip } = require('./trip.controllers')
const Trip = require('../../models/Trip')
router = express.Router()

router.param('tripId', async (req, res, next, tripId) => {
    try {
        const trip = await Trip.findById(tripId)
        if (!trip) return res.status(404).json({ msg: "trip not found" })
        req.trip = trip
        next()
    } catch (error) {
        next(error)
    }
})

router.put('/trips/:tripId', passport.authenticate('jwt', { session: false }), upadateTrip)

router.delete('/trips/:tripId', passport.authenticate('jwt', { session: false }), deleteTrip)
module.exports = router