import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@hooks/useAuth";
import type { AuthPayload } from "@models/apiData";

import InputField from "@components/InputField";
import { useToast } from "@hooks/useToast";
import { useUser } from "@hooks/useUser";
import { Button } from "@components/Button";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthPayload>();
  const { setToken } = useUser();
  const { handleLogin } = useAuth(setToken);
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data: AuthPayload) => {
    try {
      const response = await handleLogin(data);
      if (response.success) {
        toast.success("Logged in successfully");
        console.log(localStorage.getItem("token"));
        navigate("/dashboard");
      } else {
        toast.error("Login failed.");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error logging you in");
    }
  };

  return (
    <div className="w-full h-full px-[25%]!  flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white w-full h-[50vh] p-8! rounded-xl shadow-lg text-gray-800 flex flex-col items-center justify-start gap-4 border border-gray-300">
        <div className="flex items-center font-extrabold justify-center text-3xl">
          LOGIN
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 h-full w-full items-center justify-center"
        >
          <InputField
            label="Email"
            error={errors.email}
            {...register("email", { required: "Email is required" })}
            placeholder="jimmy@mcgill.com"
            type="email"
          />
          <InputField
            label="Password"
            error={errors.password}
            {...register("password", { required: "Password is required" })}
            placeholder="Kim@123"
            type="password"
          />
          <Button
            type="submit"
            disabled={!isValid}
            className="p-4! w-full border border-gray-500 h-fit outline-0 cursor-pointer rounded-xl box-border hover:border-gray-50 transition-all duration-300"
          >
            Login
          </Button>
        </form>
        <div className="text-center text-xs text-blue">
          Don't have an account yet?{" "}
          <a href="/register" className="underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
