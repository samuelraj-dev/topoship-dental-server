import { Request, Response } from "express";
import { AppDataSource } from "../../../../utils/data-source";
import { ClinicUser } from "../../../../entity/ClinicUser";
import { issueJwt } from "../../../../utils/auth";
import bcrypt from "bcrypt";

export async function loginClinicHandler(req: Request, res: Response) {
    
    const { uname, password } = req.body;

    if (!uname || !password) return res.status(404).json({ success: false, message: "Username and password is required" });

    const getUser = await AppDataSource
        .getRepository(ClinicUser)
        .createQueryBuilder("clinic_user")
        .where("clinic_user.phone_number = :uname OR clinic_user.email = :uname", { uname })
        .getOne();
    
    if(!getUser) {
        return res.status(404).json({ success: false, message: "Invalid username or password1" });
    }

    if(getUser?.password == "NA" || !getUser?.password) {
        return res.status(404).json({ success: false, message: "" });
    }

    const isValidPassword = await bcrypt.compare(password, getUser?.password);

    if(!isValidPassword) {
        return res.status(404).json({ success: false, message: "Invalid username or password2" });
    }

    const tokenObject = issueJwt(getUser);

    res.status(200).json({ success: true, user: getUser, token: tokenObject.token, expiresIn: tokenObject.expires });
}