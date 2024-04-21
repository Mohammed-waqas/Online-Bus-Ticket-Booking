import bcrypt from "bcrypt";
import userModel from "../../models/user/index.js";

const userController = {
    create: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;
            const saltRounds = 10;
            const hPassword = await bcrypt.hash(password, saltRounds);
            const existEmail = await userModel.findOne({ where: { email } });
            if (existEmail) {
                return res.status(400).json({ message: "This email is already in use" });
            }

            const newUser = await userModel.create({
                username,
                email,
                password: hPassword,
                role: role,
            });

            if (!newUser) {
                return res.status(500).json({ message: "Failed to create user" });
            }

            return res.status(201).json({ message: "User signed up successfully", user: newUser });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError' && error.errors ) {
                const usernameError = error.errors.find(err => err.path === 'username');
                if (usernameError) {
                    return res.status(400).json({ message: "Username is already in use" });
                }
            }

            console.error("Error while creating the user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

    }
}; 


export default userController;
