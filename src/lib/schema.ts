import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const currentYear = new Date().getFullYear();
const yearRegex = new RegExp(
  `^(19[0-9]{2}|20[0-${currentYear.toString()[2]}][0-${
    currentYear.toString()[3]
  }])$`
);
const passportRegex = new RegExp(/^[A-Z0-9]{6,9}$/);

export const FormDataSchema = z.object({
  personalInformation: z.object({
    firstName: z.string({ required_error: "First name is required" }),
    middleName: z.string({ required_error: "Middle name is required" }),
    lastName: z.string({ required_error: "Last name is required" }),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be atleast 10 digits")
      .max(14, "Phone number can not be more than 14 digits")
      .regex(phoneRegex, "Invalid Phone Number"),
    email: z.string().email("Invalid email address"),
  }),
  address: z.object({
    country: z.string({ required_error: "Country is required" }),
    street: z.string({ required_error: "Street Address is required" }),
    street2: z.string().optional(),
    city: z.string({ required_error: "City is required" }),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  }),
  additionalInformation: z.object({
    dob: z.string({
      invalid_type_error: "Invalid Date of Birth",
      required_error: "Date of Birth is required",
    }),
    maritialStatus: z.string({ required_error: "Maritial Status is required" }),
    gender: z.string({ required_error: "Gender is required" }),
    passportNumber: z
      .string()
      .regex(passportRegex, "Invalid Passport Number")
      .optional(),
    anyDependents: z.boolean({ required_error: "Dependents is required" }),
    relationship: z.string().optional(),
  }),
  satScore: z.object({
    math: z
      .number()
      .int()
      .min(200, "Invalid SAT Score")
      .max(800, "Invalid SAT Score")
      .optional(),
    english: z
      .number()
      .int()
      .min(200, "Invalid SAT Score")
      .max(800, "Invalid SAT Score")
      .optional(),
  }),
  preferredCountryFirstChoice: z.string({
    required_error: "First Choice Countr is required",
  }),
  preferredCountrySecondChoice: z.string({
    required_error: "Second Choice Country is required",
  }),
  preferredMajorFirstChoice: z.string({
    required_error: "First Choice Major is required",
  }),
  preferredMajorSecondChoice: z.string({
    required_error: "Second Choice Major is required",
  }),

  // preferredCountry: z.object({
  //   firstChoice: z.string({ required_error: "First Choice is required" }),
  //   secondChoice: z.string({ required_error: "Second Choice is required" }),
  // }),
  // preferredMajor: z.object({
  //   firstChoice: z.string({ required_error: "First Choice is required" }),
  //   secondChoice: z.string({ required_error: "Second Choice is required" }),
  // }),
  toeflScore: z
    .number()
    .int()
    .min(0, "Invalid TOEFL Score")
    .max(120, "Invalid TOEFL Score")
    .optional(),
  ieltsScore: z
    .number()
    .int()
    .min(0, "Invalid IELTS Score")
    .max(9, "Invalid IELTS Score")
    .optional(),
  education: z.object({
    tenthGradeSchoolName: z.string({
      required_error: "School Name is required",
    }),
    tenthGradeYear: z.string().regex(yearRegex, "Invalid Year"),
    twelvethGradeSchoolName: z.string({
      required_error: "School Name is required",
    }),
    twelvethGradeYear: z.string().regex(yearRegex, "Invalid Year"),
    bachelorsCollegeName: z.string({
      required_error: "College Name is required",
    }),
    bachelorsYear: z.string().regex(yearRegex, "Invalid Year"),
    mastersCollegeName: z.string({ required_error: "School Name is required" }),
    mastersYear: z.string().regex(yearRegex, "Invalid Year"),
  }),
  emergencyContact: z.object({
    name: z.string({ required_error: "Name is required" }),
    relation: z.string({ required_error: "Relation is required" }),
    phoneNumber: z
      .string()
      .min(10, "Invalid Phone Number")
      .max(14, "Invalid Phone Number")
      .regex(phoneRegex, "Invalid Phone Number"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    address: z.string({ required_error: "Address is required" }),
  }),
  previousEmployment: z
    .object({
      companyName: z.string().optional(),
      jobTitle: z.string().optional(),
      address: z.string().optional(),
      startDate: z
        .string({
          invalid_type_error: "Invalid Date ",
        })
        .optional(),
      endDate: z
        .string({
          invalid_type_error: "Invalid Date ",
        })
        .optional(),
      responsibilities: z.string().optional(),
      supervisorName: z.string().optional(),
      phoneNumber: z
        .string()
        .min(10, "Invalid Phone Number")
        .max(14, "Invalid Phone Number")
        .regex(phoneRegex, "Invalid Phone Number")
        .optional(),
    })
    .optional(),
});
