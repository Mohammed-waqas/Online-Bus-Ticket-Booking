import Joi from "joi";

const busValidator = {
    create: (req, res, next) => {
        const schema = Joi.object({
            registrationNumber: Joi.string().required(),
            companyName: Joi.string().required(),
            model: Joi.number().required().messages({ 'number.base': 'Bus model must be an integer' }),
            capacity: Joi.number().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Please enter valid data", error: error.details });
        }
        next();
    }
};

export default busValidator;
