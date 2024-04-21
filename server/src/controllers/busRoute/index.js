import busModel from "../../models/bus/index.js";
import busRouteModel from "../../models/route/index.js";
const busRouteController = {
    create: async (req, res) => {
        try {
            const { startDestination, endDestination, distance, departureTime, fare, registrationNumber } = req.body;
            if (!startDestination || !endDestination || !distance || !departureTime || !fare || !registrationNumber) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const bus = await busModel.findOne({ where: { registrationNumber } });
            if (!bus) {
                return res.status(404).json({ error: 'Bus not found' });
            }
            const existingRoute = await busRouteModel.findOne({ where: { BusId: bus.id } });
            if (existingRoute) {
                return res.status(400).json({ message: "Bus already has a route" });
            }
            const newBusRoute = await busRouteModel.create({
                startDestination,
                endDestination,
                distance,
                departureTime,
                fare,
                BusId: bus.id
            });

            return res.status(201).json({ message: "Bus Route added successfully", newBusRoute });
        } catch (error) {
            console.error("Error while creating the Bus Route:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    get: async (req,res) => {
        try {
            const busRoutes = await busRouteModel.findAll({
                attributes: ['startDestination', 'endDestination', 'departureTime', 'fare','BusId'],
                include: [{
                    model: busModel,
                    attributes: ['companyName']
                }]
            });
            if (!busRoutes) {
                return res.status(404).json({ message: "No bus routes found" });
            }
            return res.status(200).json({ message: "Route for all the buses", busRoutes });
        } catch (error) {
            console.error('Error fetching bus routes:', error);
            return res.status(500).json({ message: 'Unable to fetch bus routes' });
        }
    }
};

export default busRouteController;
