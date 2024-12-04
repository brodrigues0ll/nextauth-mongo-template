"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { sendCodeToConfirmEmail, verifyCode, addUser } from "@/actions/signin";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ConfirmEmailForm from "@/app/components/ConfirmEmailForm";
import LoginForm from "@/app/components/LoginForm";
import SignupForm from "@/app/components/SignupForm";

export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    code: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: loginForm.email,
        password: loginForm.password,
      });
      if (result.error) throw new Error(result.error);
      router.replace("/home");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendCodeToConfirmEmail(signupForm);
      setConfirmEmail(true);
      setIsLogin(false);
      setIsSignup(false);
      toast.success("Código enviado!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyCode(signupForm.email, signupForm.code);
      await addUser(signupForm);
      setConfirmEmail(false);
      setIsLogin(true);
      setIsSignup(false);
      toast.success("Código de confirmação verificado!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col text-black items-center justify-center">
      <div className="flex flex-col border-2 border-zinc-300 rounded-lg py-5 px-10 shadow-xl">
        {isLogin && !isSignup && !confirmEmail && (
          <LoginForm
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            handleLogin={handleLogin}
            setIsSignup={setIsSignup}
            setIsLogin={setIsLogin}
            loading={loading}
            router={router}
          />
        )}
        {isSignup && !isLogin && !confirmEmail && (
          <SignupForm
            signupForm={signupForm}
            setSignupForm={setSignupForm}
            handleSendCode={handleSendCode}
            setIsSignup={setIsSignup}
            setIsLogin={setIsLogin}
            loading={loading}
          />
        )}
        {confirmEmail && !isLogin && !isSignup && (
          <ConfirmEmailForm
            signupForm={signupForm}
            setSignupForm={setSignupForm}
            handleVerifyCode={handleVerifyCode}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
