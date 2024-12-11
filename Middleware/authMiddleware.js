import jwt from 'jsonwebtoken';

export const verifyJwt = (req, res, next) => {

    //console.log(req.cookies.accessToken)
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

   
  if (!accessToken) {
    return res.status(401).json({ status: 401, message: 'Access token not provided' });
  }

  // Assuming the token might have a "Bearer " prefix
  const token = accessToken.startsWith('Bearer ') ? accessToken.split(' ')[1] : accessToken;
  
  if (!token) {
    return res.status(401).json({ status: 401, message: 'Invalid token' });
  }
   const secret =process.env.JWT_SECRET_KEY
  try {
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ status: 401, message: 'Unauthorized user' });
  }
};