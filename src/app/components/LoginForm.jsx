"use client";

import Input from "./Input";
import Button from "./Button";

export default function LoginForm({
  loginForm,
  setLoginForm,
  handleLogin,
  setIsSignup,
  setIsLogin,
  loading,
  router,
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="text-zinc-400">Faça login na sua conta</p>
      <form className="flex flex-col gap-5 mt-5" onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Email"
          value={loginForm.email}
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Senha"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
        <span
          className="text-sm cursor-pointer hover:underline text-zinc-400"
          onClick={() => router.push("/resetpassword")}
        >
          Esqueci minha senha.
        </span>
        <Button text="Login" loading={loading} />
      </form>
      <p className="text-zinc-500 mt-5">
        Não possui uma conta?{" "}
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={() => {
            setIsLogin(false);
            setIsSignup(true);
          }}
        >
          Cadastre-se
        </span>
      </p>
    </div>
  );
}
