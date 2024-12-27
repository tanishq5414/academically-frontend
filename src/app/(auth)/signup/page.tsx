import { UserSignUpForm } from "@/app/components/user-sign-up-form";

export default function SignUpPage() {
  return (
    <div>
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-[#fbfbfb] px-4 py-8">
        <div className="mx-auto flex w-full max-w-[95%] sm:max-w-[400px] flex-col justify-center space-y-6 rounded-lg border border-gray-200 p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">Create an Account</h1>
          <UserSignUpForm />
        </div>
      </div>
    </div>
  );
} 