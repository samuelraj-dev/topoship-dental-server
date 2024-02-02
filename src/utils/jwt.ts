// UTILITY TO SIGN & VERIFY JWT_TOKEN

import jwt from 'jsonwebtoken';
import config from 'config';
import logger from './logger';

// Function signs JWT TOKEN
// parameters - { payload, privateKey, options }
// return - jwtToken
export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined,
)
{  
  const signingKey = config.get<string>(`jwtKeys.${keyName}`);

  return jwt.sign( object, signingKey, {
      ...(options && options),
      algorithm: 'RS256',
    }
  )
}

// Function verifies JWT TOKEN
// parameters - { jwtToken, publicKey }
// return - decodedObject
export function verifyJwt<T>(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey",
): T | null {

  const publicKey = config.get<string>(`jwtKeys.${keyName}`);
  
  try {
    const decoded = jwt.verify(token, publicKey);
    logger.info("success");
    return {
      valid: true,
      expired: false,
      decoded,
    } as T;
  } catch (e: any) {
    logger.error(e.message);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    } as T;
  }
}