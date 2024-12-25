import Navbar from "@/app/components/navbar";
import { UserSignInForm } from "@/app/components/user-sign-in-form";

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#fbfbfb]">
        <div className="mx-auto flex w-[400px] flex-col justify-center space-y-8 rounded-lg border border-gray-200 p-8">
          <div className="flex flex-col space-y-3 text-center">
            <h1 className="text-4xl font-black tracking-tight text-gray-900">
              Welcome back !
            </h1>
            <p className="text-sm text-gray-600">
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

