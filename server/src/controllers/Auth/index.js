import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../../models/user/index.js";
const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ where: { email } });

            if (!user) {
                return res.status(400).json({ message: "You aren't registered yet" });
            }

            const hcompare = await bcrypt.compare(password, user.password);

            if (!hcompare) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({
                id: user.id,
                username: user.username,
                email,
                role: user.role
            }, 'secret', { expiresIn: '18h' });

            res.json({ message: "Login successfully", token });
        } catch (error) {
            console.error("Error occurred:", error);
            res.status(500).json({ message: "Internal server error" });
        }

    }
};
export default authController;