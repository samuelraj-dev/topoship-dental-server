import bcrypt from "bcrypt" 
import { omit } from "lodash"
import config from "config"

import { Session } from "../../../../entity/Session";
import { ClinicAuth, privateFields } from "../../../../entity/ClinicAuth"
import { AppDataSource } from "../../../../utils/data-source";

import { signJwt, verifyJwt } from "../../../../utils/jwt";

import { getClinicById } from "../register/register.service";

/**
 * Retrieves clinic user data based on login input.
 * Validates the provided phone number and password against stored credentials.
 * Handles account activation, verification, and password validation.
 * Returns success status and clinic user data upon successful authentication.
 */
export async function getClinicUser(
  loginInput: { phone_number: String, password: string }
) {
  try {

    const { phone_number, password } = loginInput

    const clinicAuth = await AppDataSource
      .getRepository(ClinicAuth)
      .createQueryBuilder("clinic_auth")
      .where("clinic_auth.phone_number = :phone_number", { phone_number })
      .getOne();

    if (!clinicAuth) {
      return {
        success: false,
        message: "Invalid phone number or password",
      }
    }

    if(!clinicAuth.activation && clinicAuth.password == "NA") {
      return {
        success: false,
        message: "Please activate your account. Go to register"
      }
    }

    if(!clinicAuth.verified) {
      return {
        success: false,
        message: "Please verify your account to login"
      }
    }

    const isValid = await bcrypt.compare(password, clinicAuth.password);

    if (!isValid) {
      return {
        success: false,
        message: "Invalid phone number or password",
      }
    }

    return {
      success: true,
      clinicAuth
      // clinicUser: omit(clinicUser, 'password'),
    };
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}

/**
 * Creates a new session for the provided clinic user and saves it to the database.
 * Returns the session data upon successful creation.
 */

export async function createSession({
  clinicAuth,
}: {
  clinicAuth: ClinicAuth,
}) {

  const session: Session = new Session();
  session.clinic_auth = clinicAuth;

  return await AppDataSource.manager.save(session);
}

export async function updateSession({
  id, valid
}: { id: string, valid: boolean }) {
  await AppDataSource
  .getRepository(Session)
  .createQueryBuilder("session")
  .update(Session)
  .set({ valid })
  .where("session.session_id = :id", { id })
  .execute();
}

/**
 * Signs and returns an access token for the provided clinic user.
 * Generates a payload by omitting private fields from the clinicAuth object.
 * Signs the payload using the access token private key with a 15-minute expiration.
 * Returns the generated access token.
 */
export function signAccessToken(
  clinicAuth: ClinicAuth,
  session: string,
) {

  const payload = omit(clinicAuth, privateFields);

  const accessToken = signJwt(
    { ...payload, session },
    "accessTokenPrivateKey",
    {
      expiresIn: config.get<string>('accessTokenTtl') || process.env.ACCESS_TOKEN_TTL,
    }
  )

  return accessToken;
}

/**
 * Signs and returns a refresh token for the provided clinic user's authentication session.
 * Creates a new session, converts it to JSON, and signs it using the refresh token private key.
 * Returns the generated refresh token.
 */
export async function signRefreshToken(
  clinicAuth: ClinicAuth,
  session: string,
) {

  const payload = omit(clinicAuth, privateFields);
  const refreshToken = signJwt(
    { ...payload, session },
    "refreshTokenPrivateKey",
    {
      expiresIn: config.get<string>('refreshTokenTtl') || process.env.REFRESH_TOKEN_TTL,
    }
  )

  return refreshToken;
}

/**
 * Handles the refresh of access tokens.
 * Verifies the provided refresh token, retrieves associated session and clinic user data,
 * and generates a new access token for continued authentication.
 * Returns the new access token upon successful refresh.
 */
export async function refreshAccessToken(refreshToken: string) {
  // @ts-ignore

  // Verify the token and retrieve the decoded object, then convert it to JSON
  const decoded = verifyJwt<{ valid: boolean, expired: boolean, decoded: string }>(refreshToken, "refreshTokenPublicKey");
  if(!decoded) return false;
  // @ts-ignore
  if(!decoded.valid || decoded.expired) return false;

  // Retrieve the session using the decoded token and validate it
  // @ts-ignore
  const session = await getSessionById(decoded.decoded.session.session_id);
  if(!session || !session.valid) return false;

  // Retrieve clinic admin's data from the decoded session and validate
  // @ts-ignore
  const clinicUser = await getClinicById(decoded.decoded.clinic_auth_id);
  if(!clinicUser) return false;

  // Generate and dispatch a new access token
  const accessToken = signAccessToken(clinicUser, session.session_id);
  return accessToken;
}

export async function getSessionById(id: string) {
  return await AppDataSource
    .getRepository(Session)
    .createQueryBuilder("session")
    .where("session.session_id = :id", { id })
    .getOne();
}