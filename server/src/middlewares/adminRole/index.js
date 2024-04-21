const adminRoleMiddleware = (req, res, next) => {
    try {
        if (req.user.role==="admin") {
            next();
        } else {
            return res.status(403).json({ message: "You are unauthorized to perform this action" });  
        }
    } catch (error) {
        return res.status(403).json({ message: "Internal sever error" },error);
    }

};
export default adminRoleMiddleware;