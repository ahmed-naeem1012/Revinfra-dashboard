"use client";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signin } from "@/services/auth"; // Import signin function
import { SigninRequest } from "@/types/auth";

const SignIn: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState<SigninRequest>({
    email: "",
    password: "",
  });

  // State for individual field errors
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error when user types
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({ email: "", password: "" }); // Reset field errors

    try {
      const response = await signin(formData);
      Cookies.set("authToken", response.token, { expires: 7 }); 
      window.location.href = "/"; 
    } catch (apiError: any) {
      const errorDetail = apiError.detail || "An error occurred during sign-in.";
      if (errorDetail.includes("Invalid password")) {
        setFieldErrors((prev) => ({ ...prev, password: "Invalid password" }));
      } else if (errorDetail.includes("User not found")) {
        setFieldErrors((prev) => ({ ...prev, email: "User not found" }));
      } else {
        // Generic error handling for unexpected cases
        setFieldErrors({
          email: "An error occurred.",
          password: "An error occurred.",
        });
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="px-26 py-17.5 text-center">
            <Link className="mb-5.5 inline-block" href="/">
              <Image
                className="hidden dark:block"
                src={"/images/logo/logo.svg"}
                alt="Logo"
                width={176}
                height={32}
              />
              <Image
                className="dark:hidden"
                src={"/images/logo/logo-dark.svg"}
                alt="Logo"
                width={176}
                height={32}
              />
            </Link>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full rounded-lg border ${
                    fieldErrors.email
                      ? "border-red-500"
                      : "border-stroke focus:border-primary"
                  } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white`}
                  required
                />
                {fieldErrors.email && (
                  <span className="text-sm text-red-500">{fieldErrors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border ${
                    fieldErrors.password
                      ? "border-red-500"
                      : "border-stroke focus:border-primary"
                  } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white`}
                  required
                />
                {fieldErrors.password && (
                  <span className="text-sm text-red-500">{fieldErrors.password}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>

            <div className="mt-6 text-center">
              <p>
                Don’t have an account?{" "}
                <Link href="/auth/signup" className="text-primary">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
