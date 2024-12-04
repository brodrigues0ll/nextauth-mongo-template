"use client";

import Input from "./Input";
import Button from "./Button";

export default function SignupForm({
  signupForm,
  setSignupForm,
  handleSendCode,
  setIsSignup,
  setIsLogin,
  loading,
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Cadastro</h1>
      <p className="text-zinc-400">Cadastre sua conta</p>
      <form className="flex flex-col gap-5 mt-5" onSubmit={handleSendCode}>
        <Input
          type="text"
          placeholder="Nome"
          value={signupForm.name}
          onChange={(e) =>
            setSignupForm({ ...signupForm, name: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Sobrenome"
          value={signupForm.surname}
          onChange={(e) =>
            setSignupForm({ ...signupForm, surname: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Email"
          value={signupForm.email}
          onChange={(e) =>
            setSignupForm({ ...signupForm, email: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Senha"
          value={signupForm.password}
          onChange={(e) =>
            setSignupForm({ ...signupForm, password: e.target.value })
          }
        />
        <Button text="Cadastrar" loading={loading} />
      </form>
      <p className="text-zinc-500 mt-5">
        Possui uma conta?{" "}
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={() => {
            setIsSignup(false);
            setIsLogin(true);
          }}
        >
          Faça login
        </span>
      </p>
    </div>
  );
}
