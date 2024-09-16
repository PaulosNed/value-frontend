import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const currentYear = new Date().getFullYear();
const yearRegex = new RegExp(`^(19[0-9]{2}|20[0-${currentYear.toString()[2]}][0-${currentYear.toString()[3]}])$`);

export const FormDataSchema = z.object({
  personalInformation: z.object({
    firstName: z.string({required_error: "First name is required"}),
    middleName: z.string({required_error: "Middle name is required"}),
    lastName: z.string({required_error: "Last name is required"}),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be atleast 10 digits")
      .max(14, "Phone number can not be more than 14 digits")
      .regex(phoneRegex, "Invalid Phone Number"),
    email: z
      .string().email("Invalid email address"),
  }),
  address: z.object({
    country: z.string({required_error: "Country is required"}),
    street: z.string({required_error: "Street Address is required"}),
    street2: z.string().optional(),
    city: z.string({required_error: "City is required"}),
    state: z.string({required_error: "State is required"}),
    zip: z.string({required_error: "Zip/postal Code is required"}),
  }),
  additionalInformation: z.object({
    dob: z.string({invalid_type_error: "Invalid Date of Birth", required_error: "Date of Birth is required"}),  
    maritialStatus: z.string({required_error: "Maritial Status is required"}),
    gender: z.string({required_error: "Gender is required"}),
    passportNumber: z.string({required_error: "Passport Number is required"}),
    anyDependents: z.boolean({required_error: "Dependents is required"}),
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
    firstChoice: z.string({required_error: "First Choice is required"}),
    secondChoice: z.string({required_error: "Second Choice is required"}),
  }),
  prefferedMajor: z.object({
    firstChoice: z.string({required_error: "First Choice is required"}),
    secondChoice: z.string({required_error: "Second Choice is required"}),
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
      schoolName: z.string({required_error: "School Name is required"}),
      year: z.string().min(1).regex(yearRegex, "Invalid Year"),
      // grade: z.string().min(1, "Grade is required"),
    }),
    twelvethGrade: z.object({
      schoolName: z.string({required_error: "School Name is required"}),
      year: z
        .string()
        .min(1900, "Invalid Year")
        .max(2023, "Invalid Year"),
      // grade: z.string().min(1, "Grade is required"),
    }),
    bachelors: z.object({
      collegeName: z.string({required_error: "College Name is required"}),
      year: z.string().min(1).regex(yearRegex, "Invalid Year"),
      // grade: z.string().min(1, "Grade is required"),
    }),
    masters: z.object({
      collegeName: z.string({required_error: "College Name is required"}),
      year: z.string().min(1).regex(yearRegex, "Invalid Year"),
      // grade: z.string().min(1, "Grade is required"),
    }),
  }),
  emergencyContact: z.object({
    name: z.string({required_error: "Name is required"}),
    relation: z.string({required_error: "Relation is required"}),
    phoneNumber: z
      .string()
      .min(10, "Invalid Phone Number")
      .max(14, "Invalid Phone Number")
      .regex(phoneRegex, "Invalid Phone Number"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    address: z.string({required_error: "Address is required"}),
  }),
  previousEmployment: z.object({
    companyName: z.string({required_error: "Company Name is required"}),
    jobTitle: z.string({required_error: "Job Title is required"}),
    address: z.string({required_error: "Address is required"}),
    startDate: z.date({ message: "Invalid Date" }),
    endDate: z.date({ message: "Invalid Date" }),
    responsibilities: z.string({required_error: "Responsibilities is required"}),
    supervisorName: z.string({required_error: "Supervisor Name is required"}),
    phoneNumber: z
      .string()
      .min(10, "Invalid Phone Number")
      .max(14, "Invalid Phone Number")
      .regex(phoneRegex, "Invalid Phone Number"),
  }),
});
