import seatModel from "../../models/seat/index.js";
import busModel from "../../models/bus/index.js";
import passengerModel from "../../models/passenger/index.js";
import paymentModel from "../../models/payment/index.js";
import { Op } from "sequelize";
const seatController = {
  create: async (req, res) => {
    try {
      const { seatNumber, seatType, availabilityStatus, registrationNumber } = req.body;
      const bus = await busModel.findOne({ where: { registrationNumber } });
      if (!bus) {
        return res.status(404).json({ error: 'Bus not found' });
      }
      const newSeat = await seatModel.create({
        seatNumber,
        seatType,
        availabilityStatus,
        BusId: bus.id,
        PassengerId: null
      });
      res.status(201).json({message:"Seat added successfully",newSeat});
    } catch (error) {
      console.error("Error creating seat:", error);
      res.status(500).json({ error: "Failed to create seat." });
    }

  },
  get: async (req, res) => {
    try {
      const params = req.params;
      if (!params.BusId) {
        return res.status(400).json({ message: "BusId is required" });
      }
      const totalSeats = await seatModel.findAll({ where: { BusId: params.BusId } });

      const numbersOfSeats = totalSeats.length;
      const availableSeats = totalSeats.filter((seat) => seat.availabilityStatus === 'available').length;
      const availableSeatNumbers = totalSeats.filter((seat) => seat.availabilityStatus === 'available');
      const availableSeatNumber = availableSeatNumbers.map(seat => seat.seatNumber);
      const bus =await busModel.findByPk(params.BusId,{attributes:["companyName","model","capacity","registrationNumber"]})
      return res.status(200).json({
        message: "Total Number of seats of a bus and Also available Seats for this bus",
        bus,
        numbersOfSeats,
        availableSeats,
        availableSeatNumber
        
      });
    } catch (error) {
      console.error('Error fetching seats:', error);
      return res.status(500).json({ message: 'Unable to fetch seats' });
    }

  },
  update: async (req, res) => {
    try {
        const seatNumbers = req.body.seatNumbers;

        // Check if seatNumbers is an array
        if (!Array.isArray(seatNumbers)) {
          return res.status(400).json({ message: "Seat numbers must be provided in an array" });
        }

        const availableSeats = [];

        // Loop through each selected seat number
        for (const seatNumber of seatNumbers) {
          // Assuming seatNumber is float type, convert it to string for querying
          const seat = await seatModel.findOne({ where: { seatNumber } });

          // Check if the seat exists and is available
          if (seat && seat.availabilityStatus === "available") {
            availableSeats.push(seatNumber); // Add available seat number to the list
          }
        }

        if (availableSeats.length === 0) {
          return res.status(403).json({ message: "Only select the available seats and these seats are already reserved" });
        }

        const UserId = req.user.id;
        const passenger = await passengerModel.findOne({
          where: { UserId: UserId }
        });

        if (!passenger) {
          return res.status(404).json({ message: "Passenger does not exist" });
        }

        // Update availabilityStatus and PassengerId for each available seat
        await seatModel.update(
          {
            availabilityStatus: "reserved",
            PassengerId: passenger.id
          },
          {
            where: {
              seatNumber: { [Op.in]: availableSeats }, // Using [Op.in] to match multiple seat numbers
              availabilityStatus: "available"
            }
          }
        );

        return res.status(200).json({ message: "Seats reserved successfully", reservedSeats: availableSeats });
    } catch (error) {
      console.error('Error while reserving seats:', error);
      return res.status(500).json({ message: 'Unable to reserve seats' });
    }


  },
  updateSeatStatus: async (req, res) => {
    try {
      const UserId = req.user.id;
      const passenger = await passengerModel.findOne({
        where: { UserId: UserId }
      });
      if (!passenger) {
        return res.status(404).json({ message: "Passenger does not exist" });
      }
      const payment = await paymentModel.findByPk(passenger.id);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      if (payment.transactionStatus === 'success') {
        // Update seats from "reserved" to "booked" where PassengerId matches and availabilityStatus is "reserved"
        await seatModel.update(
          { availabilityStatus: "booked" },
          {
            where: {
              PassengerId: payment.PassengerId,
              availabilityStatus: "reserved"
            }
          }
        );
        return res.status(200).json({ message: 'Seats updated successfully to booked' });
      } else if (payment.transactionStatus === 'failed') {
        // If transaction failed, reset seats to "available" and remove PassengerId
        await seatModel.update(
          { availabilityStatus: 'available', PassengerId: null },
          { where: { PassengerId: passenger.id } }
        );
        return res.status(200).json({ message: 'Seats updated successfully to available from reserved and PassengerId reset' });
      } else {
        return res.status(400).json({ error: 'Invalid transaction status' });
      }
    } catch (error) {
      console.error('Error updating seats based on transaction status:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

  }
};

export default seatController;
