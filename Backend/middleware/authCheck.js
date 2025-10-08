import jwt from 'jsonwebtoken';

export const checkUser = (req, res, next) => {
  // Check for token in cookies first, then in Authorization header
  let token = req.cookies?.jwt || req.headers.authorization;

  // Handle Bearer token format
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  console.log('Token received:', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET.trim());
    console.log('Token decoded successfully:', decode);
    if (!decode) return res.status(401).json({ message: 'you are not authorized' });
    req.userId = decode.id;
    req.role = decode.role;
    next();
  } catch (error) {
    console.log('JWT verification error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export const checkAdmin = (req, res, next) => {
  if (req.role === 'Admin') return next();
  return res.status(401).json({ message: 'you are not authorized' });
}