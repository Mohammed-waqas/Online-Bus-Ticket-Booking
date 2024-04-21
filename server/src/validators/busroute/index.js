import Joi from "joi";
const busrouteValidator = {
    create: (req, res, next) => {
        const schema = Joi.object({
            startDestination: Joi.string().required(),
            endDestination: Joi.string().required(),
            distance: Joi.string().required(),
            departureTime: Joi.string().required(),
            fare: Joi.number().required(),
            registrationNumber:Joi.required()
        })
        const response = schema.validate(req.body)
        if (response.error) {
            return res.status(401).json({ message: "Please enter valid data", error: response.error })
        }
        next();
    }
};
export default busrouteValidator;