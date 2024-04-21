import Joi from "joi";
const paymentValidator = {
    create: (req, res, next) => {
        const schema = Joi.object({
            amount: Joi.number(),
            paymentMethod: Joi.string(),
            transactionStatus: Joi.string().valid('success', 'failed'),
            timestamp: Joi.date()
        })
        const response = schema.validate(req.body)
        if (response.error) {
            return res.status(401).json({ message: "Please enter valid data", error: response.error })
        }
        next();
    }
};
export default paymentValidator;  