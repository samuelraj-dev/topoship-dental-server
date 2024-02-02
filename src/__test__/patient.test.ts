import supertest from "supertest";
import createServer from "../utils/server";
import connectDB from "../utils/connectDB";
import { AppDataSource } from "../utils/data-source";
import { createPatient } from "../api/domain/patient/patient.service";

const app = createServer();

const patientPayload = {
  "patient_name": "Google",
  "mobile": "1234567890",
  "email": "john.doe@example.com",
  "gender": "male",
  "dob": "1990-01-01",
  "age": 32,
  "emergency_mobile": "9876543210",
  "address": "123 Main Street",
  "city": "ExampleCity",
  "state": "andaman_and_nicobar_islands",
  "country": "india",
  "pincode": "400001",
  "blood_group": "A+",
  "current_medication": "None"
}

describe("patient", () => {

  beforeAll(async () => {
    await connectDB();
  })

  afterAll(async () => {
    await AppDataSource.destroy();
  })

  describe("get patient route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        
        const patient_id = 'abc';

        await supertest(app).get(`/api/patient/${patient_id}`).expect(404);
      })
    })

    describe("given the product does exist", () => {
      it("should return a 200 status and the patient", async () => {
        
        // @ts-ignore
        const product = await createPatient(patientPayload);

        const {body, statusCode} = await supertest(app)
          .post(`/api/patient`)
        
        expect(statusCode).toBe(200);
        expect(body.message).toBe('Patient Created...');
      })
    })
  })
})