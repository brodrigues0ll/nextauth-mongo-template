"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { addUser } from "@/actions/signin";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await addUser(signupForm);
      toast.success("Cadastro realizado!");
      setSignupForm({ name: "", surname: "", email: "", password: "" });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Ativar o estado de carregamento
    const result = await signIn("credentials", {
      redirect: false,
      email: loginForm.email,
      password: loginForm.password,
    });
    if (result.error) {
      setLoading(false);
      return toast.error(result.error);
    }
    router.replace("/home");
  };

  return (
    <div className="bg-white h-screen flex flex-col text-black items-center justify-center">
      <div className="flex flex-col border-2 porder-zinc-300 rounded-lg py-5 px-10 shadow-xl">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">
            {isLogin ? "Login" : "Cadastro"}
          </h1>
          <p className="text-zinc-400">
            {isLogin ? "Faça login na" : "Cadastre"} sua conta
          </p>
        </div>

        {isLogin ? (
          <div>
            <form className="flex flex-col gap-5 mt-5" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email"
                className="border-2 border-zinc-300 rounded-lg p-2"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Senha"
                className="border-2 border-zinc-300 rounded-lg p-2"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
              <span
                className="-mt-4 w-full text-right text-zinc-400 text-sm cursor-pointer hover:underline"
                onClick={() => router.push("/resetpassword")}
              >
                Esqueci minha senha.
              </span>

              <button
                className="bg-blue-400 rounded-lg p-2 flex justify-center items-center"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <p className="font-medium">Login</p>
                )}
              </button>
            </form>
            <p className="text-zinc-500 mt-5">
              Não possui uma conta?{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Cadastre-se
              </span>
            </p>
          </div>
        ) : (
          <div>
            <form className="flex flex-col gap-5 mt-5" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Nome"
                className="border-2 border-zinc-300 rounded-lg p-2"
                value={signupForm.name}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, name: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Sobrenome"
                className="border-2 border-zinc-300 rounded-lg p-2"
                value={signupForm.surname}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, surname: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Email"
                className="border-2 border-zinc-300 rounded-lg p-2"
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Senha"
                className="border-2 border-zinc-300 rounded-lg p-2"
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
              />

              <button className="bg-zinc-300 rounded-lg p-2" type="submit">
                Cadastrar
              </button>
            </form>
            <p className="text-zinc-500 mt-5">
              Possui uma conta?{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Faça login
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
