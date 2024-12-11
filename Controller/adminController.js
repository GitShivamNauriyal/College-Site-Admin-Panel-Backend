import prisma from "../DB/db.config.js";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import { generateJWTToken, generateRefreshToken } from "../Utils/authUtils.js";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcrypt";

//* Saving Refresh Token to database
const saveRefreshToken = async (Token, User) => {
    try {
        const saveRefreshToken = await prisma.adminToken.create({
            data: {
                refreshToken: Token,
                userId: User.id,
            },
        });

        if (!saveRefreshToken) {
            console.log("Refresh Token not saved");
            throw Error;
        }
    } catch (error) {
        console.log(error);
    }
};

export const adminLoginController = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const validator = vine.compile(loginSchema);
        const payload = await validator.validate(body);

        const checkAdmin = prisma.admins.findUnique({
            where: {
                username: payload.username,
                password: payload.password,
            },
        });

        if (!checkAdmin) {
            return res
                .status(400)
                .json({ status: 400, message: "Invalid access" });
        }

        const accessToken = generateJWTToken(checkAdmin);
        const refreshToken = generateRefreshToken(checkAdmin);
        saveRefreshToken(refreshToken, checkAdmin);

        const options = {
            httpOnly: true,
            secure: true,
        };
        // console.log("check ",refreshToken);
        return res
            .status(200)
            .cookie("accessToken", `Bearer ${accessToken}`, options)
            .cookie("refreshToken", `Bearer ${refreshToken}`, options)
            .cookie("role", "admin", options)
            .json({
                status: 200,
                accessToken: `Bearer ${accessToken}`,
                refreshToken: `Bearer ${refreshToken}`,
            });
    } catch (error) {
        console.log(error);
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return res.status(400).json({ errors: error.messages });
        } else {
            return res
                .status(500)
                .json({ message: "Something went Wrong , Try again later" });
        }
    }
};

export const adminRegisterController = async (req, res) => {
    try {
        const body = req.body;
        const validator = vine.compile(registerSchema);
        const payload = await validator.validate(body);
        const { username } = payload;
        const userExist = await prisma.admins.findFirst({
            where: {
                username: username,
            },
        });

        if (userExist) {
            return res.status(400).json({ error: "Admin already exists" });
        }

        const salt = bcrypt.genSaltSync(15);
        payload.password = bcrypt.hashSync(payload.password, salt);

        const userCreated = await prisma.admins.create({
            data: payload,
        });
        if (userCreated) {
            return res
                .status(200)
                .json({ message: "admin Created Sucessfully" });
        }
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return res.status(400).json({ errors: error.messages });
        } else {
            console.log(error);
            return res
                .status(500)
                .json({ message: "Something went Wrong , Try again later" });
        }
    }
};

export const adminlogoutController = async (req, res) => {
    const user = req.user.id;
    const options = {
        httpOnly: true,
        secure: true,
    };
    const deleteToken = await prisma.token.deleteMany({
        where: {
            userId: user,
        },
    });
    if (!deleteToken) {
        return res.status(401).json({
            status: 401,
            message: "Cannot logout, please try again later",
        });
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ status: 200, message: "Logout Sucessfully" });
};
