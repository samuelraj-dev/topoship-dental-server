// // INSERT INTO `clinic_auth`(`registration_number`, `activation`, `email`, `phone_number`, `password`) VALUES ('123', 0,'sam@gmail.com','9999999999','NA')
import bcrypt from "bcrypt";
import config from "config";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer";
import { google } from "googleapis";

import { AppDataSource } from "../../../../utils/data-source";
import { ClinicUser } from "../../../../entity/ClinicUser";
import { ClinicInfo } from "../../../../entity/ClinicInfo";

export async function registerClinic(
  { registrationNumber, clinicInfoInput, doctorName, specialization, password }: { registrationNumber: string, clinicInfoInput: ClinicInfo, doctorName: string, specialization: string, password: string }
) {
  try {    

    const utcTime = (new Date()).getTime();
    const utcDate = new Date(utcTime);

    const updateClinicInfo = await AppDataSource
      .getRepository(ClinicInfo)
      .createQueryBuilder("clinic_info")
      .update(ClinicInfo)
      .set({
        activation: true,
        verified: false,
        verification_code: uuidv4(),
        // data
        clinic_name: clinicInfoInput.clinic_name,
        description: clinicInfoInput.description,
        address: clinicInfoInput.address,
        email: clinicInfoInput.email,
        phone_number: clinicInfoInput.phone_number,
        additional_information: clinicInfoInput.additional_information,
        is_two_factor_authentication_enabled: clinicInfoInput.is_two_factor_authentication_enabled,
        updated_at: utcDate,
      })
      .where("clinic_info.registration_number = :registration_number", { registration_number: registrationNumber })
      .execute();

    console.log(updateClinicInfo);

    if(updateClinicInfo.affected !== 1) return { success: false, message: "error registering clinic", code: 500 };

    const data = await AppDataSource
      .getRepository(ClinicInfo)
      .createQueryBuilder("clinic_info")
      .where("clinic_info.registration_number = :registration_number", { registration_number: registrationNumber })
      .getOne();

    if(!data) return { success: false, message: "clinic not registered", code: 500 };

    const clinicOwner = new ClinicUser();

    const saltWorkFactor = config.get<number>('saltWorkFactor');
    const salt = await bcrypt.genSalt(saltWorkFactor);
    const hash = await bcrypt.hashSync(password, salt);

    clinicOwner.doctor_name = doctorName;
    clinicOwner.specialization = specialization;
    clinicOwner.email = clinicInfoInput.email;
    clinicOwner.phone_number = clinicInfoInput.phone_number;
    clinicOwner.email_otp = uuidv4();
    clinicOwner.password = hash;
    clinicOwner.isOwner = true;
    clinicOwner.role = "admin";
    clinicOwner.created_at = utcDate;
    clinicOwner.updated_at = utcDate;
    clinicOwner.clinicInfo = data;

    await AppDataSource.manager.save(clinicOwner);

    // const testAccount = await nodemailer.createTestAccount();
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   }
    // });

    // const info = await transporter.sendMail({
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: "bar@example.com, baz@example.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });
    // 
    // console.log(info);

    const CLIENT_ID = config.get<string>("oAuth2Cred.clientID");
    const CLIENT_SECRET = config.get<string>("oAuth2Cred.clientSecret");
    const REDIRECT_URI = config.get<string>("oAuth2Cred.redirectURI");
    const REFRESH_TOKEN = config.get<string>("oAuth2Cred.refreshToken");

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    async function sendMail() {
      try {
        
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
          // @ts-ignore
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "samuelrajholyns@gmail.com",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
          }
        });

        const mailOptions = {
          from: "DENTAL TOPOSHIP 📬 <samuelrajholyns@gmail.com>",
          to: clinicInfoInput.email,
          subject: "Verification Code for your clinic account",
          text: `code: ${clinicOwner.email_otp}`,
          html: `<h1>Code: ${clinicOwner.email_otp}</h1>`,
        };

        const result = await transport.sendMail(mailOptions);
        return result;

      } catch (error) {
        console.log(error);
      }
    }

    sendMail()
      .then(result => console.log(result))
      .catch(err => console.log(err));

    return { success: true, message: "admin account created successfully", code: 200 };
    
  } catch (error: any) {

    console.log(error.message);
    return { success: false, message: "internal error", code: 500 };
    
  }
}

export async function verifyClinic(
  { registrationNumber, clinicVerifyInput }: { registrationNumber: string, clinicVerifyInput: { email_otp: string } }
) {
  const data = await AppDataSource
      .getRepository(ClinicInfo)
      .createQueryBuilder("clinic_info")
      .leftJoinAndSelect("clinic_info.clinicUsers", "clinicUsers")
      .where("clinic_info.registration_number = :registration_number", { registration_number: registrationNumber })
      .getOne();

  // console.log("form db", data?.clinicUsers[0].email_otp);
  // console.log(clinicVerifyInput.email_otp);

  if(data?.clinicUsers[0].email_otp === clinicVerifyInput.email_otp) {

    data.verified = true;
    await AppDataSource.manager.save(data);

    return { success: true, message: "correct code", code: 200 };
  }

  return { success: false, message: "not verified", code: 404 };
}

// export async function checkClinic(
//   { registration_number, phone_number, email }: { registration_number: String, phone_number: string, email: String }
// ) {
//   try {

//     const data = await AppDataSource
//       .getRepository(ClinicAuth)
//       .createQueryBuilder("clinic_auth")
//       .where("clinic_auth.phone_number = :phone_number", { phone_number })
//       .getOne();

//     if (!data) {
//       return {
//         success: false,
//         message: "Phone number didn't match",
//       };
//     }

//     if (data?.email !== email) {
//       return {
//         success: false,
//         message: "Email didn't match",
//       };
//     }

//     if (data?.registration_number !== registration_number) {
//       return {
//         success: false,
//         message: "Registration number didn't match",
//       };
//     }

//     if(data.activation && data.password !== "NA") {
//       return {
//         success: false,
//         message: "You've already registered. Go to login page"
//       }
//     }

//     return {
//       success: true,
//       data
//     };
    
//   } catch (error: any) {

//     throw new Error(error.message);
    
//   }
// }

// export async function getClinicById(id: string) {
//   const data = await AppDataSource
//     .getRepository(ClinicAuth)
//     .createQueryBuilder("clinic_auth")
//     .where("clinic_auth.clinic_auth_id = :id", { id })
//     .getOne();

//   return data;
// }

// export async function getClinicData(
//   { clinic_data, password, phone_number }: { clinic_data: any, password: string, phone_number: string }
// ) {
//   const utcTime = (new Date()).getTime();
//   const offset = 5.5 * 60 * 60 * 1000;
//   const utcDate = new Date(utcTime);
//   const istDate = new Date(utcTime + offset);

//   const clinicData = new ClinicData();

//   clinicData.clinic_name = clinic_data.clinic_name;
//   clinicData.description = clinic_data.description;
//   clinicData.address = clinic_data.address;
//   clinicData.email = clinic_data.email;
//   clinicData.phone_number = clinic_data.phone_number;
//   clinicData.is_active = clinic_data.is_active;
//   clinicData.accreditation_body = clinic_data.accreditation_body;
//   clinicData.registration_date = clinic_data.registration_date;
//   clinicData.accreditation_expiry_date = clinic_data.accreditation_expiry_date;
//   clinicData.additional_information = clinic_data.additional_information;
//   clinicData.is_two_factor_authentication_enabled = clinic_data.is_two_factor_authentication_enabled;
//   clinicData.created_at = utcDate;
//   clinicData.updated_at = utcDate;
//   // @ts-ignore
//   // clinicData.clinic_auth = clinicAuth;
//   await AppDataSource.manager.save(clinicData);

//   const data = await AppDataSource
//       .getRepository(ClinicData)
//       .createQueryBuilder("clinic_data")
//       .where("clinic_data.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
//       .getOne();

//   // @ts-ignore
//   const saltWorkFactor = config.get<number>('saltWorkFactor') || parseInt(process.env.SALT_WORK_FACTOR);
//   const salt = await bcrypt.genSalt(saltWorkFactor);
//   const hash = await bcrypt.hashSync(password, salt);

//   await AppDataSource
//     .createQueryBuilder()
//     .update(ClinicAuth)
//     .set({ activation: true, password: hash })
//     .where("phone_number = :phone_number", { phone_number })
//     .execute()

//     return data;
// }