import Joi from "joi";
const userValidator = {
    signup: (req, res, next) => {
        const schema = Joi.object({
            username: Joi.string().min(5).max(20).required(),
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6).max(8),
            role: Joi.string().required(),
        })
        const response = schema.validate(req.body)
        if (response.error) {
            return res.status(401).json({ message: "Please enter valid data", error: response.error })
        }
        next();  
    }
};
export default userValidator;