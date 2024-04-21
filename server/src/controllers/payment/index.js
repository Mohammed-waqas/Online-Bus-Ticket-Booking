import passengerModel from "../../models/passenger/index.js";
import paymentModel from "../../models/payment/index.js";
import busRouteModel from "../../models/route/index.js";
import seatModel from "../../models/seat/index.js";

const paymentController = {
    create: async (req, res) => {
        try {
            const UserId = req.user.id;
            const passenger = await passengerModel.findOne({
                where: { UserId: UserId }
            });
            if (!passenger) {
                return res.status(404).json({ error: 'Passenger not found' });
            }
            const reservedSeats = await seatModel.findAll({
                where: {
                    availabilityStatus: 'reserved',
                    PassengerId: passenger.id
                }
            });
            if (reservedSeats.length === 0) {
                return res.status(404).json({ error: 'No reserved seats found for the passenger' });
            }
            const seat = await seatModel.findOne({ where: { PassengerId: passenger.id } });
            if (!seat) {
                return res.status(404).json({ error: 'Seat not found' });
            }

            const busId = seat.BusId;
            const busRoutes = await busRouteModel.findAll({
                where: { BusId: busId }
            });
            if (!busRoutes || busRoutes.length === 0) {
                return res.status(404).json({ error: 'Bus route not found' });
            }
            let totalFare = 0;
            for (const route of busRoutes) {
                totalFare += route.fare;
            }
            const numberOfSeats = reservedSeats.length;
            const amount = numberOfSeats * totalFare;
            const payment = await paymentModel.create({
                amount,
                paymentMethod: 'credit_card',
                transactionStatus: 'success',
                timestamp: new Date(),
                SeatId: seat.id,
                PassengerId:passenger.id
            });
            await passenger.setPayment(payment);
            return res.status(201).json({ message: 'Seat booked successfully', payment });
        } catch (error) {
            console.error('Error occurred while booking seat:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

    }
};
export default paymentController;