import passengerModel from "../../models/passenger/index.js";
const passengerController = {
    create: async (req, res) => {
        try {
            const { idCardNumber, phoneNumber, gender, fullName } = req.body;
            const existingPassenger = await passengerModel.findOne({
                where: {idCardNumber: idCardNumber }
            });
            if (existingPassenger) {
                return res.status(400).json({ message: "IdCardNumber already exists and it must be unique" });
            }
            const passenger = await passengerModel.create({
                idCardNumber,
                phoneNumber,
                gender,
                email: req.user.email,
                fullName,
                UserId: req.user.id
            });
            return res.json({ message: "User signed up successfully", passenger });
        } catch (error) {
            console.error("Error while creating the user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

    }
};

export default passengerController;
  