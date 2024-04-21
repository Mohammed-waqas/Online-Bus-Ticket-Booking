import Joi from "joi";
const passengerValidator = {
    create: (req, res, next) => {
        const schema = Joi.object({
            idCardNumber: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            fullName: Joi.string().required().max(20),
            gender: Joi.string().required(),
            email: Joi.string().email()
        })
        const response = schema.validate(req.body)
        if (response.error) {
            return res.status(401).json({ message: "Please enter valid data", error: response.error })
        }
        next();
    }
};
export default passengerValidator;