import { NextFunction, Request, Response } from "express";
import { get } from "lodash";

import { verifyJwt } from "../../utils/jwt";
import { refreshAccessToken } from "../../api/domain/auth/login/login.service";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

  const accessToken = 
      get(req, "cookies.accessToken") ||
      get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken = 
      get(req, "cookies.refreshToken")
      get(req, "headers.x-refresh");

  if(!accessToken) {
    return next();
  }
  // @ts-ignore
  const { decoded, expired } = verifyJwt<{ valid: boolean, expired: boolean, decoded: string }>(accessToken, "accessTokenPublicKey");

  if(decoded) {
    res.locals.user = decoded;
  }

  if (expired && refreshToken) {
    // @ts-ignore
    const newAccessToken = await refreshAccessToken(refreshToken);

    if(newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);

      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, //15min
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: "strict",
        secure: false,
      });
    }

    // @ts-ignore
    const result = verifyJwt(newAccessToken, "accessTokenPublicKey");
    // @ts-ignore
    res.locals.user = result.decoded;
    
    return next();
  }

  return next();
}

export default deserializeUser