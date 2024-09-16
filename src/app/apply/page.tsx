"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormDataSchema } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: [
      "personalInformation.firstName",
      "personalInformation.middleName",
      "personalInformation.lastName",
      "personalInformation.email",
      "personalInformation.phoneNumber",
    ],
  },
  {
    id: "Step 2",
    name: "Address",
    fields: [
      "address.country",
      "address.state",
      "address.city",
      "address.street",
      "address.street2",
      "address.zip",
    ],
  },
  {
    id: "Step 3",
    name: "Additional Information",
    fields: [
      "additionalInformation.dob",
      "additionalInformation.maritialStatus",
      "additionalInformation.gender",
      "additionalInformation.passportNumber",
      "additionalInformation.anyDependent",
      "additionalInformation.relationShip",
    ],
  },
  {
    id: "Step 4",
    name: "Main Information",
    fields: [
      "satScore.math",
      "satScore.english",
      "toeflScore",
      "mathScore",
      "ieltsScore",
      "prefferedMajor.firstChoice",
      "prefferedMajor.secondChoice",
      "prefferedCountry.firstChoice",
      "prefferedCountry.secondChoice",
    ],
  },
  {
    id: "Step 5",
    name: "Education",
    fields: [
      "education.tenthGrade.schoolName",
      "education.tenthGrade.year",
      "education.twelvethGrade.schoolName",
      "education.twelvethGrade.year",
      "education.bachelors.schoolName",
      "education.bachelors.year",
      "education.masters.schoolName",
      "education.masters.year",
    ],
  },
  {
    id: "Step 6",
    name: "Emergency Contact",
    fields: [
      "emergencyContact.name",
      "emergencyContact.relation",
      "emergencyContact.phoneNumber",
      "emergencyContact.email",
      "emergencyContact.address",
    ],
  },
  {
    id: "Step 7",
    name: "Previous Employment",
    fields: [
      "previousCompany.companyName",
      "previousCompany.jobTitle",
      "previousCompany.address",
      "previousCompany.startDate",
      "previousCompany.endDate",
      "previousCompany.responsibilities",
      "previousCompany.supervisorName",
      "previousCompany.phoneNumber",
    ],
  },
  { id: "Step 8", name: "Complete" },
];

export default function Page() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const delta = currentStep - previousStep;

  const form = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log("data from form", data);
    form.reset();
  };

  type FieldName = keyof Inputs;

  const goToHome = () => {
    router.push("/");
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    console.log("Status", currentStep, steps.length - 1);
    console.log();

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div className="w-full md:w-3/4 mx-auto items-center md:shadow-custom-blue md:rounded-lg md:mt-10">
      <section className="flex flex-col justify-between px-10 md:p-24">
        {/* steps */}
        <nav aria-label="Progress">
          <ol
            role="list"
            className="space-y-4 md:flex md:space-x-8 md:space-y-0"
          >
            {steps.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-sky-600 transition-colors ">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div
                    className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                    aria-current="step"
                  >
                    <span className="text-sm font-medium text-sky-600">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-gray-500 transition-colors">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Form */}
        <Form {...form}>
          <form
            className="mt-12 py-12"
            onSubmit={form.handleSubmit(processForm)}
          >
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Provide your personal details.
                </p>
                <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full md:col-span-2">
                    <FormField
                      control={form.control}
                      name="personalInformation.firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <Input
                            type="text"
                            id="firstName"
                            {...field}
                            autoComplete="given-name"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-full md:col-span-2">
                    <FormField
                      control={form.control}
                      name="personalInformation.middleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middle name</FormLabel>
                          <Input
                            type="text"
                            id="middleName"
                            {...field}
                            autoComplete="additional-name"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="personalInformation.lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <Input
                            type="text"
                            id="lastName"
                            {...field}
                            autoComplete="family-name"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <FormField
                      control={form.control}
                      name="personalInformation.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <Input
                            type="email"
                            id="email"
                            {...field}
                            autoComplete="email"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="personalInformation.phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <Input
                            type="tel"
                            id="phoneNumber"
                            {...field}
                            autoComplete="tel"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-full">
                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street address 1</FormLabel>
                          <Input
                            type="text"
                            id="street"
                            {...field}
                            autoComplete="street-address"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="address.street2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street address 2 (optional)</FormLabel>
                          <Input
                            type="text"
                            id="street2"
                            required={false}
                            {...field}
                            autoComplete="street-address-2"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <Input
                            type="text"
                            id="city"
                            {...field}
                            autoComplete="address-level2"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Input
                            type="text"
                            id="state"
                            {...field}
                            autoComplete="address-level1"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="address.zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP / Postal code</FormLabel>
                          <Input
                            type="text"
                            id="zip"
                            {...field}
                            autoComplete="postal-code"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Additional Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Additional Information about yourself.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-full">
                    {/* <FormField
                      control={form.control}
                      name="additionalInformation.dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                    <FormField
                      control={form.control}
                      name="additionalInformation.dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="date"
                              value={field.value?.toString()}
                              className="w-full flex justify-between"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="additionalInformation.maritialStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maritial Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Marriage Status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Single">Single</SelectItem>
                              <SelectItem value="Married">Married</SelectItem>
                              <SelectItem value="Divorced">Divorced</SelectItem>
                              <SelectItem value="Widowed">Widowed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="additionalInformation.gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            autoComplete="sex"
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Single">Male</SelectItem>
                              <SelectItem value="Married">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="additionalInformation.passportNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passport Number</FormLabel>
                          <Input
                            type="text"
                            id="passportNumber"
                            {...field}
                            autoComplete="passport-number"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-full">
                    <FormField
                      control={form.control}
                      name="additionalInformation.anyDependents"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Are you bringing any Dependent?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              // value={field.value ? "true" : "false"}  // Reflect the current value
                              onValueChange={(value) =>
                                field.onChange(value === "true")
                              } //to keep anyDependents boolean
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="true" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="false" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  No
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-full">
                    <FormField
                      control={form.control}
                      name="additionalInformation.relationShip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            If Yes, What is your relationShip with the
                            dependant?
                          </FormLabel>
                          <Input
                            type="text"
                            placeholder="Example: Son"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Main Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Please provide the informations required below.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-1 self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>Sat Score</i>
                    </h2>
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="satScore.math"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Math</FormLabel>
                          <Input
                            {...field}
                            type="number"
                            id="satScore.math"
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="satScore.english"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>English</FormLabel>
                          <Input
                            {...field}
                            type="number"
                            id="english"
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-1 self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>Other Scores</i>
                    </h2>
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="toeflScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TOEFL Score</FormLabel>
                          <Input
                            {...field}
                            type="number"
                            id="toeflScore"
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="ieltsScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IELTS Score</FormLabel>
                          <Input
                            {...field}
                            type="number"
                            id="ieltsScore"
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1 self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>Preffered Country</i>
                    </h2>
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="prefferedCountry.firstChoice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Choice</FormLabel>
                          <Input type="text" id="firstChoice" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="prefferedCountry.secondChoice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Second Choice</FormLabel>
                          <Input type="text" id="secondChoice" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1 self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>Preffered Major</i>
                    </h2>
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="prefferedMajor.firstChoice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Choice</FormLabel>
                          <Input type="text" id="firstChoiceMajor" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="prefferedMajor.secondChoice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Second Choice</FormLabel>
                          <Input
                            type="text"
                            id="secondChoiceMajor"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Education
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Please provide the informations required below.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-1 self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>10th Grade</i>
                    </h2>
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="education.tenthGrade.schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Name</FormLabel>
                          <Input type="text" id="schoolName10th" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="education.tenthGrade.year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Input type="text" id="year10th" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-1 self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>12th Grade</i>
                    </h2>
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="education.twelvethGrade.schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Name</FormLabel>
                          <Input type="text" id="schoolName12th" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="education.twelvethGrade.year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Input type="text" id="year12th" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1 self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>Bachelors</i>
                    </h2>
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="education.bachelors.collegeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Name</FormLabel>
                          <Input
                            type="text"
                            id="collegeNameBachelors"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="education.bachelors.year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Input type="number" id="yearBachelors" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1 self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>Masters</i>
                    </h2>
                  </div>

                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="education.masters.collegeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Name</FormLabel>
                          <Input
                            type="text"
                            id="collegeNameMasters"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="education.masters.year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Input type="number" id="yearMasters" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Emergency Contact Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Provide the personal details of your emergency contact.
                </p>
                <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full md:col-span-2">
                    <FormField
                      control={form.control}
                      name="emergencyContact.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <Input
                            type="text"
                            id="emergencyContactName"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-full md:col-span-2">
                    <FormField
                      control={form.control}
                      name="emergencyContact.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <Input
                            type="email"
                            id="emergencyContactEmail"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="emergencyContact.relation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship</FormLabel>
                          <Input
                            type="text"
                            id="emergencyContactRelationship"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <FormField
                      control={form.control}
                      name="emergencyContact.address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <Input
                            type="text"
                            id="emergencyContactAddress"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="emergencyContact.phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <Input
                            type="text"
                            id="emergencyContactPhone"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 6 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Previous Employment Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  <b>
                    <i>Note:</i>
                  </b>{" "}
                  {`This is only applicable for those with employment history. Feel free to skip this page if you don't have one`}{" "}
                </p>
                <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full md:col-span-2">
                    <FormField
                      control={form.control}
                      name="previousEmployment.companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <Input
                            type="text"
                            id="previousEmploymentCompanyName"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-full md:col-span-2">
                    <FormField
                      control={form.control}
                      name="previousEmployment.phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Phone Number</FormLabel>
                          <Input
                            type="text"
                            id="previousEmploymentPhone"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-full md:col-span-2">
                    <FormField
                      control={form.control}
                      name="previousEmployment.address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Address</FormLabel>
                          <Input
                            type="text"
                            id="previousEmploymentAddress"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="previousEmployment.jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <Input
                            type="text"
                            id="previousEmploymentJobTitle"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <FormField
                      control={form.control}
                      name="previousEmployment.responsibilities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Responsibilities</FormLabel>
                          <Input
                            type="text"
                            id="previousEmploymentResponsibilities"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="previousEmployment.supervisorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supervisor Name</FormLabel>
                          <Input
                            type="text"
                            id="previousEmploymentSupervisorName"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="previousEmployment.startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <Input
                            {...field}
                            type="date"
                            value={field.value?.toString()}
                            className="w-full flex justify-between"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="previousEmployment.endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <Input
                            {...field}
                            type="date"
                            value={field.value?.toString()}
                            className="w-full flex justify-between"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 7 && (
              <>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Complete
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Thank you for your submission.
                </p>
              </>
            )}
          </form>
        </Form>

        {/* Navigation */}
        <div className="mt-8 pt-5">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prev}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={currentStep === steps.length - 1 ? goToHome : next}
              //   disabled={currentStep === steps.length - 1}
              //   className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentStep == steps.length - 2
                ? "Submit"
                : currentStep == steps.length - 1
                ? "Go to Home Page"
                : "Next"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
