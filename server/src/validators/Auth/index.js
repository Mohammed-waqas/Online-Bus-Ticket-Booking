import Joi from "joi";
const authValidator = {
    login: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6).max(8),
        })
        const response = schema.validate(req.body)
        if (response.error) {
            return res.status(401).json({ message: "Please enter valid data", error: response.error })
        }
        next();
    }
};
export default authValidator;