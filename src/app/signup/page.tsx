/* eslint-disable @next/next/no-img-element */
import { UserSignupAuthForm } from "@/components/signup/UserSignupAuthForm";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex w-full md:w-3/4 mx-auto h-[600px] items-center md:shadow-custom-blue md:rounded-lg md:my-5">
        <div className="hidden md:block w-1/2 h-full">
          <img
            src="/images/auth/bgImg.svg"
            alt="Auth bg"
            className="w-full h-full object-cover filter brightness-50 rounded-l-lg"
          />
        </div>
        <div className="w-full mx-10 md:mx-0 md:w-1/2">
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create a new account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your information below to create your account
                </p>
              </div>
              <UserSignupAuthForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
