import { Country, Gender, State } from "../../../entity/MstPatient";
import { TypeOf, number, object, string, z } from "zod";

export const gender = z.enum(
  [
    "male",
    "female",
    "other"
  ]
)
export const state = z.enum(
  [
      'andhra_pradesh',
      'arunachal_pradesh',
      'assam',
      'bihar',
      'chhattisgarh',
      'goa',
      'gujarat',
      'haryana',
      'himachal_pradesh',
      'jharkhand',
      'karnataka',
      'kerala',
      'madhya_pradesh',
      'maharashtra',
      'manipur',
      'meghalaya',
      'mizoram',
      'nagaland',
      'odisha',
      'punjab',
      'rajasthan',
      'sikkim',
      'tamil_nadu',
      'telangana',
      'tripura',
      'uttar_pradesh',
      'uttarakhand',
      'west_bengal',
      'andaman_and_nicobar_islands',
      'chandigarh',
      'dadra_and_nagar_haveli_and_daman_and_diu',
      'lakshadweep',
      'delhi',
      'puducherry',
  ]
)
export const country = z.enum([
  "india",
  "other"
])

export const patientSchema = object({

  body: object({
    patient_id: string({
      required_error: "ID is required"
    }),

    patient_name: string({
      required_error: "Name is required"
    }),

    mobile: string({
      required_error: "Mobile Number is required"
    }).min(10, "Enter proper number"),

    email: string().nullable(),

    gender: z.nativeEnum(Gender),

    age: number({
      required_error: "Age is required"
    }),

    emergency_mobile: string().nullable(),

    address: string({
      required_error: "Address is required"
    }),

    city: string({
      required_error: "City is required"
    }),

    state: z.nativeEnum(State),

    country: z.nativeEnum(Country),

    pincode: string({
      required_error: "Pincode is required"
    }),

    blood_group: string({
      required_error: "Blood Group is required"
    }),

    current_medication: string({
      required_error: "Medication is required"
    }),

    created_at: z.date({
      required_error: "created_at is required"
    }),

    updated_at: z.date({
      required_error: "updated_at is required"
    }),

  })

});

// export type PatientInput = Omit<
//   TypeOf<typeof patientSchema>,
//   "patient_id" | "created_at" | "updated_at"
// >;
export type PatientInput = TypeOf<typeof patientSchema>