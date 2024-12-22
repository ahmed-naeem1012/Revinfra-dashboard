import React from "react";
import Link from "next/link";

const VerifyEmail: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-900">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
          Verify Your Email
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          We’ve sent a verification link to your email. Please check your inbox
          and follow the link to complete the signup process.
        </p>
        <Link
          href="/auth/signin"
          className="block w-full rounded-lg bg-primary p-3 text-center text-white hover:bg-primary-dark"
        >
          Go to login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
