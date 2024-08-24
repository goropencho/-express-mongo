import jwt = require('jsonwebtoken');
export interface TokenPayload extends jwt.JwtPayload {
  user: {
    id: string;
  };
}
