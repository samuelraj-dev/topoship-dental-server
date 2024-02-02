// import { TypeOf, number, object, string, z } from "zod";
// import { Gender, State, Country } from "../../../entity/MstPatient";

// export const createPatientSchema = object({

//   body: object({
//     patient_id: string({
//       required_error: "ID is required"
//     }),

//     patient_name: string({
//       required_error: "Name is required"
//     }),

//     mobile: string({
//       required_error: "Mobile Number is required"
//     }).min(10, "Enter proper number"),

//     email: string().nullable(),

//     gender: z.nativeEnum(Gender),

//     dob: z.date().nullable(),

//     age: number({
//       required_error: "Age is required"
//     }),

//     emergency_mobile: string().nullable(),

//     address: string({
//       required_error: "Address is required"
//     }),

//     city: string({
//       required_error: "City is required"
//     }),

//     state: z.nativeEnum(State),

//     country: z.nativeEnum(Country),

//     pincode: string({
//       required_error: "Pincode is required"
//     }),

//     blood_group: string({
//       required_error: "Blood Group is required"
//     }),

//     current_medication: string({
//       required_error: "Medication is required"
//     }),

//     created_at: z.date({
//       required_error: "created_at is required"
//     }),

//     updated_at: z.date({
//       required_error: "updated_at is required"
//     }),

//   })

// });

// export type CreatePatientInput = TypeOf<typeof createPatientSchema>;

// export type CreatePatientInput = Omit<
//   TypeOf<typeof createPatientSchema>,
//   "body.passwordConfirmation"
// >;