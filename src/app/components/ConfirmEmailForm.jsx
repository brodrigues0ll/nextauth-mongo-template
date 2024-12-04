"use client";

import Input from "./Input";
import Button from "./Button";

export default function ConfirmEmailForm({
  signupForm,
  setSignupForm,
  handleVerifyCode,
  loading,
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Confirme seu e-mail</h1>
      <p className="text-zinc-400">Digite o código enviado para seu e-mail</p>
      <form className="flex flex-col gap-5 mt-5" onSubmit={handleVerifyCode}>
        <Input
          type="text"
          placeholder="Código"
          value={signupForm.code}
          onChange={(e) =>
            setSignupForm({ ...signupForm, code: e.target.value })
          }
        />
        <Button text="Confirmar" loading={loading} />
      </form>
    </div>
  );
}
