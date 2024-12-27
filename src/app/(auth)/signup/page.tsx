import { UserSignUpForm } from "@/app/components/user-sign-up-form";

export default function SignUpPage() {
  return (
      <div>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#fbfbfb]">
        <div className="mx-auto flex w-[400px] flex-col justify-center space-y-8 rounded-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Create an Account</h1>
        <UserSignUpForm />
        </div>
      </div>
    </div>
  );
} 