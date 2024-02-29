import crypto, { sign } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import jwt from "jsonwebtoken";

import config from "config";
import { ClinicUser } from "../entity/ClinicUser";

// function genPassword(password) {
//     const salt = crypto.randomBytes(32).toString('hex');
//     const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

//     return {
//         salt: salt,
//         hash: genHash,
//     }
// }

// function validPassword(password, hash, salt) {
//     const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//     return hash === hashVerify;
// }

// const pathToKey = path.join(__dirname, "..", "..", "id_rsa_priv.pem");
// const PRIV_KEY = fs.readFileSync(pathToKey, "utf-8");

const PRIV_KEY = config.get<string>("jwtKeys.privateKey");

function issueJwt(user: ClinicUser) {
    const id = user.clinic_user_id;

    const expiresIn = 24 * 60 * 60 * 1000;

    const payload = {
        sub: id,
        iat: Date.now()
    };

    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: "RS256" });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

export {
    issueJwt
}