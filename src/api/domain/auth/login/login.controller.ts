/**
 * CONTAINS TWO CONTROLLERS:
 * - createSessionHandler
 * - refreshAccessTokenHandler
*/

import { Request, Response } from "express";
import { get } from "lodash";

import { verifyJwt } from "../../../../utils/jwt";
import { getClinicById } from "../register/register.service";

// Services
import { 
  getClinicUser,
  createSession,
  signAccessToken,
  signRefreshToken,
  updateSession,
  getSessionById,
} from "./login.service";

/**
 * Handles the creation of user sessions.
 * Retrieves clinic user data based on the request body,
 * signs and dispatches both access and refresh tokens upon successful user authentication.
 * Returns the generated access and refresh tokens.
 */
export async function createSessionHandler(req: Request, res: Response) {

  const data = await getClinicUser(req.body);
  if (!data.success) { return res.status(404).json(data); };

  // @ts-ignore
  const session = await createSession(data.clinicAuth);

  // @ts-ignore
  const accessToken = signAccessToken(data.clinicAuth, session);
  // @ts-ignore
  const refreshToken = await signRefreshToken(data.clinicAuth, session);

  res.cookie("accessToken", accessToken, {
    maxAge: 3.154e10, //15min
    httpOnly: false,
    domain: 'topoship-server-test.onrender.com',
    // domain: 'localhost',
    path: '/',
    sameSite: "strict",
    secure: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, //1yr
    httpOnly: false,
    domain: 'topoship-server-test.onrender.com',
    // domain: 'localhost',
    path: '/',
    sameSite: "strict",
    secure: true,
  });

  return res.status(200).json({
      accessToken,
      refreshToken,
    });
}

export async function deleteSessionHandler(req: Request, res: Response) {

  const sessionId = res.locals.user.decoded.session.session_id;

  await updateSession({ id: sessionId, valid: false })

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

/**
 * Handles the refresh of access tokens.
 * Verifies the provided refresh token, retrieves associated session and clinic user data,
 * and generates a new access token for continued authentication.
 * Returns the new access token upon successful refresh.
 */
export async function refreshAccessTokenHandler(req: Request, res: Response) {

  const refreshToken = get(req, 'headers.x-refresh');
  // @ts-ignore

  // Verify the token and retrieve the decoded object, then convert it to JSON
  const decoded = verifyJwt<{ valid: boolean, expired: boolean, decoded: string }>(refreshToken, "refreshTokenPublicKey");
  // @ts-ignore
  if(!decoded.valid || decoded.expired) {
    return res.status(401).json({ success: false, message: 'Couldn\'t refresh token1' });
  }
  console.log(decoded);

  // Retrieve the session using the decoded token and validate it
  // @ts-ignore
  const session = await getSessionById(decoded.decoded.session.session_id);
  if(!session || !session.valid) {
    return res.status(401).json({ success: false, message: 'Couldn\'t refresh token2' });
  }

  // Retrieve clinic admin's data from the decoded session and validate
  // @ts-ignore
  const clinicUser = await getClinicById(decoded.decoded.clinic_auth_id);
  if(!clinicUser) {
    return res.status(401).json({ success: false, message: 'Couldn\'t refresh token3' });
  }

  // Generate and dispatch a new access token
  const accessToken = signAccessToken(clinicUser, session.session_id);
  return res.send({ accessToken });
}

export async function getCurrentUserHandler(req: Request, res: Response) {

  return res.send(res.locals.user);
}