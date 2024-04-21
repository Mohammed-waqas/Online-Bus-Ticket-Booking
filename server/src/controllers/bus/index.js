import busModel from "../../models/bus/index.js";
const busController = {
    create: async (req, res) => {
        try {
            const { registrationNumber, companyName, model, capacity } = req.body;
            if (!registrationNumber || !companyName || !model || !capacity) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const newBus = await busModel.create({
                registrationNumber,
                companyName,
                model,
                capacity
            });
            res.status(201).json({ message: "Bus added successfully", newBus });
        } catch (error) {
            console.error("Error while creating the bus:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export default busController;
