import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "config";

const PUB_KEY = config.get<string>("jwtKeys.publicKey");

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const tokenParts = req?.headers?.authorization?.split(' ');

    if(!tokenParts) return res.status(401).json({ success: false, message: "You are not authorized to visit this route" });
    
    if(tokenParts[0] == 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {        
        try {
            const verification = jwt.verify(tokenParts[1], PUB_KEY, { algorithms: ["RS256"] });
            // @ts-ignore
            req.jwt = verification;
            res.locals.decodedJwt = verification;
            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: "You are not authorized to visit this route" });
        }
    } else {
        return res.status(401).json({ success: false, message: "You are not authorized to visit this route" });
    }
}