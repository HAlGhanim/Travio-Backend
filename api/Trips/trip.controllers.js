const Trip = require("../../models/Trip")


const upadateTrip = async (req, res, next) => {
    try {
        const owner = req.user.createdBy
        if (owner) {
            const { tripId } = req.params;
            const trip = await Trip.findById(tripId)
            if (!trip) {
                res.status(404).json({ message: "trip not found" })
            } else {

                await Trip.updateOne(tripId)
            }
        } return res.status(404).json({ message: "you are not the creater of this trip" })
    } catch (error) {
        next(error)

    }
}


const deleteTrip = async (req, res, next) => {
    try {
        if (req.user._id.equals(req.trip.createdBy)) {
            await req.trip.deleteOne();
            return res.status(204).json({ message: "trip is deleted" })
        }
        return res.status(401).json({ message: " you're not the creater of this trip" })

    } catch (error) {
        next(error)
    }
}
module.exports = {
    upadateTrip, deleteTrip
}