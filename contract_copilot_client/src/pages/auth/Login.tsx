import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@hooks/useAuth";
import type { AuthPayload } from "@models/apiData";

import InputField from "@components/InputField";
import { useToast } from "@hooks/useToast";
import { useUser } from "@hooks/useUser";

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
    <div className="w-full h-full px-[25%]!  flex items-center justify-center min-h-screen bg-black">
      <div className="w-full h-[50vh] p-8! border-[0.5px] border-white rounded-xl shadow-lg shadow-white text-blue-200 flex flex-col items-center justify-start gap-4">
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
            placeholder="Enter your email"
            type="email"
          />
          <InputField
            label="Password"
            error={errors.password}
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            type="password"
          />
          <button
            type="submit"
            disabled={!isValid}
            className="p-4! w-full border border-gray-500 h-fit outline-0 cursor-pointer rounded-xl box-border hover:border-gray-50 transition-all duration-300"
          >
            Login
          </button>
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
