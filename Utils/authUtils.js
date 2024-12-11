import jwt from "jsonwebtoken"
//* Generating the JWT Token
export const generateJWTToken = (User) => {
	const payloadData = {
		id: User.id,
		username: User.username
	};
	const token = jwt.sign(payloadData, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_SECRET_EXPIRE,
	});
	console.log("token formed",token);
	return token;
};

//* Generating the RefreshToken
export const generateRefreshToken = (User) => {
	try {
		const payloadData = {
			id: User.id,
		};

		const refreshToken = jwt.sign(payloadData, process.env.JWT_REFRESH_SECRET_KEY, {
			expiresIn: process.env.JWT_REFRESH_EXPIRE,
		});

		return refreshToken;
	} catch (error) {
		console.error("Error generating refresh token:", error);
		throw new Error("Internal server error");
	}
};