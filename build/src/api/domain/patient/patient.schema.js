"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientSchema = exports.country = exports.state = exports.gender = void 0;
const MstPatient_1 = require("../../../entity/MstPatient");
const zod_1 = require("zod");
exports.gender = zod_1.z.enum([
    "male",
    "female",
    "other"
]);
exports.state = zod_1.z.enum([
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
]);
exports.country = zod_1.z.enum([
    "india",
    "other"
]);
exports.patientSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        patient_id: (0, zod_1.string)({
            required_error: "ID is required"
        }),
        patient_name: (0, zod_1.string)({
            required_error: "Name is required"
        }),
        mobile: (0, zod_1.string)({
            required_error: "Mobile Number is required"
        }).min(10, "Enter proper number"),
        email: (0, zod_1.string)().nullable(),
        gender: zod_1.z.nativeEnum(MstPatient_1.Gender),
        age: (0, zod_1.number)({
            required_error: "Age is required"
        }),
        emergency_mobile: (0, zod_1.string)().nullable(),
        address: (0, zod_1.string)({
            required_error: "Address is required"
        }),
        city: (0, zod_1.string)({
            required_error: "City is required"
        }),
        state: zod_1.z.nativeEnum(MstPatient_1.State),
        country: zod_1.z.nativeEnum(MstPatient_1.Country),
        pincode: (0, zod_1.string)({
            required_error: "Pincode is required"
        }),
        blood_group: (0, zod_1.string)({
            required_error: "Blood Group is required"
        }),
        current_medication: (0, zod_1.string)({
            required_error: "Medication is required"
        }),
        created_at: zod_1.z.date({
            required_error: "created_at is required"
        }),
        updated_at: zod_1.z.date({
            required_error: "updated_at is required"
        }),
    })
});
//# sourceMappingURL=patient.schema.js.map