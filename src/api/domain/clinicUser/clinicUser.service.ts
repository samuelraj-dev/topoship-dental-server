import { AppDataSource } from "../../../utils/data-source";
import { ClinicUser } from "../../../entity/ClinicUser";
// import { CreatePatientInput } from "./appointment.schema";



export async function getClinicUser({ id }: { id: string })
{
  try {
    const data = await AppDataSource
      .getRepository(ClinicUser)
      .createQueryBuilder("clinic_user")
      .where("clinic_user.clinic_user_id = :id", { id })
      .leftJoinAndSelect("clinic_user.clinicInfo", "clinicInfo")
      .getOne();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}