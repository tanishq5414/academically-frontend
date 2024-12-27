import { UserSignInForm } from "@/app/components/user-sign-in-form";

const LoginPage = () => {
  return (
    <div>
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-[#fbfbfb] px-4 py-8">
        <div className="mx-auto flex w-full max-w-[95%] sm:max-w-[400px] flex-col justify-center space-y-6 rounded-lg border border-gray-200 p-4 sm:p-8">
          <div className="flex flex-col space-y-2 sm:space-y-3 text-center">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
              Welcome back!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Enter your email to sign in to your account
            </p>
          </div>
          <UserSignInForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

