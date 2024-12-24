"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormDataSchema } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

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
import {
  useApplyMutation,
  useGetHighSchoolsQuery,
} from "@/store/users/usersApi";
import { useToast } from "@/components/ui/use-toast";

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
      "address.zipCode",
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
      "additionalInformation.relationship",
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
      "preferredMajorFirstChoice",
      "preferredMajorSecondChoice",
      "preferredCountryFirstChoice",
      "preferredCountrySecondChoice",
    ],
  },
  {
    id: "Step 5",
    name: "Education",
    fields: ["education.currentHighschool", "education.graduationYear"],
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
      "previousEmployment.companyName",
      "previousEmployment.jobTitle",
      "previousEmployment.address",
      "previousEmployment.startDate",
      "previousEmployment.endDate",
      "previousEmployment.responsibilities",
      "previousEmployment.supervisorName",
      "previousEmployment.phoneNumber",
    ],
  },
  { id: "Step 8", name: "Complete" },
];

export default function Page() {
  const { plan } = useParams();
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const delta = currentStep - previousStep;

  const [apply, { data, isError, isSuccess, error: submissionError }] = useApplyMutation();
  const { data: highschools, isLoading: highschoolsLoading } =
    useGetHighSchoolsQuery();

  const form = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const request = {
      ...data,
      planType: Number(plan),
    };
    setIsLoading(true);

    const response: any = await apply(request)
      .unwrap()
      .then((payload) => {
        toast({
          variant: "default",
          title: `Successfully Applied`,
          description: `you have successfully applied`,
        });
        setPreviousStep(currentStep);
        setCurrentStep((step) => step + 1);
        form.reset(); // Reset the form after the delay
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error found", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.data.error.message}`,
        });
        setIsLoading(false);
      });
  };

  type FieldName = keyof Inputs;

  const goToHome = () => {
    router.push("/");
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    console.log("fields", fields);
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    console.log("output", output);
    if (!output) return;

    console.log("Status", currentStep, steps.length - 1);

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)(); // Wait for form submission to finish
        } else {
        setPreviousStep(currentStep);
        setCurrentStep((step) => step + 1); // Move to the next step immediately
      }
    }
  };

  const prev = () => {
    if (currentStep > 0 && currentStep !== steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const highschoolOptions = highschools?.map((school) => ({
    value: school.id.toString(),
    label: school.name,
  }));

  return (
    <div className="w-full md:w-3/4 mx-auto items-center md:shadow-custom-blue md:rounded-lg md:mt-10">
      <section className="flex flex-col justify-between px-10 md:p-24">
        {/* steps */}
        <nav aria-label="Progress">
          <ol
            role="list"
            className="space-y-4 hidden md:flex md:space-x-8 md:space-y-0"
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
          <div className="mt-12 py-12">
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
                <div className="mt-10 grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full md:col-span-2">
                    <FormField
                      control={form.control}
                      name="personalInformation.firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            First name{" "}
                            {FormDataSchema.shape.personalInformation.shape.firstName.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                          <FormLabel>
                            Middle name{" "}
                            {FormDataSchema.shape.personalInformation.shape.middleName.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                          <FormLabel>
                            Last name{" "}
                            {FormDataSchema.shape.personalInformation.shape.lastName.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                          <FormLabel>
                            Email address{" "}
                            {FormDataSchema.shape.personalInformation.shape.email.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                          <FormLabel>
                            Phone number{" "}
                            {FormDataSchema.shape.personalInformation.shape.phoneNumber.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
                  <div className="md:col-span-full">
                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Country{" "}
                            {FormDataSchema.shape.address.shape.country.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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

                  <div className="md:col-span-3">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Street address 1{" "}
                            {FormDataSchema.shape.address.shape.street.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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

                  <div className="md:col-span-3">
                    <FormField
                      control={form.control}
                      name="address.street2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Street address 2{" "}
                            {FormDataSchema.shape.address.shape.street2.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            City{" "}
                            {FormDataSchema.shape.address.shape.city.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            State{" "}
                            {FormDataSchema.shape.address.shape.state.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            ZIP / Postal code{" "}
                            {FormDataSchema.shape.address.shape.zipCode.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
                          <Input
                            type="text"
                            id="zipCode"
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

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
                  <div className="md:col-span-full">
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
                          <FormLabel>
                            Date of Birth{" "}
                            {FormDataSchema.shape.additionalInformation.shape.dob.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="additionalInformation.maritialStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Maritial Status{" "}
                            {FormDataSchema.shape.additionalInformation.shape.maritialStatus.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="additionalInformation.gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Gender{" "}
                            {FormDataSchema.shape.additionalInformation.shape.dob.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                          <FormLabel>
                            Passport Number{" "}
                            {FormDataSchema.shape.additionalInformation.shape.passportNumber.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                          <FormLabel>
                            Are you bringing any Dependent?{" "}
                            {FormDataSchema.shape.additionalInformation.shape.anyDependents.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                      name="additionalInformation.relationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            If Yes, What is your relationship with the
                            dependant?{" "}
                            {FormDataSchema.shape.additionalInformation.shape.relationship.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
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

                <div className="mt-10 grid grid-cols-1 gap-x-6 md:gap-y-8 md:grid-cols-6">
                  <div className="col-span-1 mb-2 capitalize  md:mb-0 md:self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>Sat Score</i>
                    </h2>
                  </div>

                  <div className="md:col-span-2">
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

                  <div className="md:col-span-3">
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
                  <div className="col-span-1 mt-8 mb-2 capitalize  md:my-0 md:self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>Other Scores</i>
                    </h2>
                  </div>

                  <div className="md:col-span-2">
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

                  <div className="md:col-span-3">
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

                  <div className="col-span-1 mt-8 mb-2 capitalize  md:my-0 md:self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>preferred Country</i>
                    </h2>
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="preferredCountryFirstChoice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            First Choice{" "}
                            {FormDataSchema.shape.preferredCountryFirstChoice.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
                          <Input type="text" id="firstChoice" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <FormField
                      control={form.control}
                      name="preferredCountrySecondChoice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Second Choice{" "}
                            {FormDataSchema.shape.preferredCountrySecondChoice.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
                          <Input type="text" id="secondChoice" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1 mt-8 mb-2 capitalize  md:my-0 md:self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>preferred Major</i>
                    </h2>
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="preferredMajorFirstChoice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            First Choice{" "}
                            {FormDataSchema.shape.preferredMajorFirstChoice.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
                          <Input type="text" id="firstChoiceMajor" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <FormField
                      control={form.control}
                      name="preferredMajorSecondChoice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Second Choice{" "}
                            {FormDataSchema.shape.preferredMajorSecondChoice.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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

                <div className="mt-10 grid grid-cols-1 gap-x-6 md:gap-y-8 md:grid-cols-8">
                  <div className="col-span-2 mb-2 capitalize  md:mb-0 md:self-end">
                    <h2 className="text-slate-500 md:py-3">
                      <i>Current Highschool</i>
                    </h2>
                  </div>

                  <div className="md:col-span-4">
                    <FormField
                      control={form.control}
                      name="education.currentHighschool"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Current Highschool name{" "}
                            {FormDataSchema.shape.education.shape.currentHighschool.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Current HighSchool" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {!highschoolsLoading &&
                                highschoolOptions?.map((option, idx) => (
                                  <SelectItem key={idx} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
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
                      name="education.graduationYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Graduation Year{" "}
                            {FormDataSchema.shape.education.shape.graduationYear.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
                          <Input
                            type="text"
                            id="highschoolGraduationYear"
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
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
                  <div className="col-span-full md:col-span-2">
                    <FormField
                      control={form.control}
                      name="emergencyContact.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Full Name{" "}
                            {FormDataSchema.shape.emergencyContact.shape.name.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                          <FormLabel>
                            Email address{" "}
                            {FormDataSchema.shape.emergencyContact.shape.email.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                          <FormLabel>
                            Relationship{" "}
                            {FormDataSchema.shape.emergencyContact.shape.relation.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                          <FormLabel>
                            Address{" "}
                            {FormDataSchema.shape.emergencyContact.shape.address.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                          <FormLabel>
                            Phone number{" "}
                            {FormDataSchema.shape.emergencyContact.shape.phoneNumber.isOptional() ? null : (
                              <span className="text-orange-500">*</span>
                            )}
                          </FormLabel>
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
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
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
                <h2 className="text-base font-semibold leading-7 text-gray-900 mb-4">
                  Thank you for your application!
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600 mb-4">
                  We appreciate your interest and the time you’ve taken to
                  complete the application. Our team will carefully review the
                  information you provided. If everything is correct and we
                  confirm your payment, we will send you an email with the
                  details you need to access your account.
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-600 mb-4">
                  Please keep an eye on your email for this message. If you
                  don’t receive it within a few days, be sure to check your spam
                  or junk folder.
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Thank you again for choosing us, and we look forward to
                  working with you!
                </p>
              </>
            )}
          </div>
        </Form>

        {/* Navigation */}
        <div className="mt-8 pt-5">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prev}
              disabled={currentStep === 0 && currentStep == steps.length - 1}
            >
              Back
            </Button>
            <Button
              onClick={currentStep === steps.length - 1 ? goToHome : next}
              //   disabled={currentStep === steps.length - 1}
              //   className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading
                ? "Submitting..."
                : currentStep == steps.length - 1
                ? "Done"
                : currentStep == steps.length - 2
                ? "Submit"
                : "Next"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
