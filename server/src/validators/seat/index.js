import Joi from "joi";
const seatValidator = {
    create: (req, res, next) => {
        const schema = Joi.object({
            seatNumber: Joi.number().required(),
            seatType: Joi.string().valid('window', 'aisle').required(),
            availabilityStatus: Joi.string().valid('booked', 'reserved', 'available').required(),
            registrationNumber: Joi.string().required(),
        })
        const response = schema.validate(req.body)
        if (response.error) {
            return res.status(401).json({ message: "Please enter valid data", error: response.error })
        }
        next();
    }
};
export default seatValidator;