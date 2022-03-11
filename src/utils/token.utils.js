require('dotenv').config();
const jwt = require('jsonwebtoken');
// const { readFileSync } = require('fs');

const { JWT_PUBLIC_KEY, JWT_EXPIRES_IN } = process.env;

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  //   const secret = readFileSync(JWT_PUBLIC_KEY, { encoding: 'utf-8' });

  const token = jwt.sign(payload, JWT_PUBLIC_KEY, {
    expiresIn: parseInt(JWT_EXPIRES_IN),
  });
  return token;
};

module.exports = { generateToken };
