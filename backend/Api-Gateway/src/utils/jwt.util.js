import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

//verity token
export const handleVerifyToken = async ({
  token,
  secretkey = process.env.SECRET_KEY,
}) => {
  const decoded = jwt.verify(token, secretkey);
  return decoded;
};
