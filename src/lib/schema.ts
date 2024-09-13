import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const FormDataSchema = z.object({
  personalInformation: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().min(1, "Middle name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z
      .string()
      .min(10, "Invalid Phone Number")
      .max(14, "Invalid Phone Number")
      .regex(phoneRegex, "Invalid Phone Number"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
  }),
  address: z.object({
    country: z.string().min(1, "Country is required"),
    street: z.string().min(1, "Street is required"),
    street2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip is required"),
  }),
  additionalInformation: z.object({
    dob: z.date({ message: "Invalid Date of Birth" }),
    maritialStatus: z.string().min(1, "Maritial Status is required"),
    gender: z.string().min(1, "Gender is required"),
    passportNumber: z.string().min(1, "Passport Number is required"),
    anyDependents: z.boolean(),
    relationShip: z.string().optional(),
  }),
  satScore: z.object({
    math: z
      .number()
      .int()
      .min(200, "Invalid SAT Score")
      .max(800, "Invalid SAT Score"),
    english: z
      .number()
      .int()
      .min(200, "Invalid SAT Score")
      .max(800, "Invalid SAT Score"),
  }),
  prefferedCountry: z.object({
    firstChoice: z.string().min(1, "First Choice is required"),
    secondChoice: z.string().min(1, "Second Choice is required"),
  }),
  prefferedMajor: z.object({
    firstChoice: z.string().min(1, "First Choice is required"),
    secondChoice: z.string().min(1, "Second Choice is required"),
  }),
  toeflScore: z
    .number()
    .int()
    .min(0, "Invalid TOEFL Score")
    .max(120, "Invalid TOEFL Score"),
  ieltsScore: z
    .number()
    .int()
    .min(0, "Invalid IELTS Score")
    .max(9, "Invalid IELTS Score"),
  education: z.object({
    tenthGrade: z.object({
      schoolName: z.string().min(1, "School Name is required"),
      year: z
        .number()
        .int()
        .min(1900, "Invalid Year")
        .max(2023, "Invalid Year"),
      // grade: z.string().min(1, "Grade is required"),
    }),
    twelvethGrade: z.object({
      schoolName: z.string().min(1, "School Name is required"),
      year: z
        .number()
        .int()
        .min(1900, "Invalid Year")
        .max(2023, "Invalid Year"),
      // grade: z.string().min(1, "Grade is required"),
    }),
    bachelors: z.object({
      collegeName: z.string().min(1, "College Name is required"),
      year: z
        .number()
        .int()
        .min(1900, "Invalid Year")
        .max(2023, "Invalid Year"),
      // grade: z.string().min(1, "Grade is required"),
    }),
    masters: z.object({
      collegeName: z.string().min(1, "College Name is required"),
      year: z
        .number()
        .int()
        .min(1900, "Invalid Year")
        .max(2023, "Invalid Year"),
      // grade: z.string().min(1, "Grade is required"),
    }),
  }),
  emergencyContact: z.object({
    name: z.string().min(1, "Name is required"),
    relation: z.string().min(1, "Relation is required"),
    phoneNumber: z
      .string()
      .min(10, "Invalid Phone Number")
      .max(14, "Invalid Phone Number")
      .regex(phoneRegex, "Invalid Phone Number"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    address: z.string().min(1, "Address is required"),
  }),
  previousEmployment: z.object({
    companyName: z.string().min(1, "Company Name is required"),
    jobTitle: z.string().min(1, "Job Title is required"),
    address: z.string().min(1, "Address is required"),
    startDate: z.date({ message: "Invalid Date" }),
    endDate: z.date({ message: "Invalid Date" }),
    responsibilities: z.string().min(1, "Responsibilities is required"),
    supervisorName: z.string().min(1, "Supervisor Name is required"),
    phoneNumber: z
      .string()
      .min(10, "Invalid Phone Number")
      .max(14, "Invalid Phone Number")
      .regex(phoneRegex, "Invalid Phone Number"),
  }),
});
