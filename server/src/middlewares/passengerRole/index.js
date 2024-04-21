import jwt from "jsonwebtoken";

const passengerRoleMiddleware = (req, res, next) => {
    try {
        if (req.user.role==="passenger") {
            next();
        } else {
            return res.status(403).json({ message: "You are unauthorized to perform this action" });
        }
    } catch (error) {
        return res.status(403).json({ message: "Internal server error"},error);
    }
    
};
export default passengerRoleMiddleware;
