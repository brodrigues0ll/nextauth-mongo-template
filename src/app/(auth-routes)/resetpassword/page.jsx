"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { sendRecoveryCode } from "@/actions/recoveryPass";

const RecoveryPassPage = () => {
  const [email, setEmail] = useState("");
  const [sentCode, setSentCode] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");

  const handleSendCode = async () => {
    try {
      await sendRecoveryCode(email);
      toast.success("Código enviado com sucesso! Verifique seu e-mail.");
      setSentCode(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col text-black items-center justify-center">
      <div className="flex flex-col border-2 border-zinc-300 rounded-lg py-5 px-10 shadow-xl">
        {!sentCode ? (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Recuperar Senha</h1>
            <p className="text-zinc-400">
              Digite o e-mail que utilizou para criar sua conta.
            </p>

            <input
              type="email"
              placeholder="E-mail"
              className="border-2 border-zinc-300 rounded-lg p-2 mt-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="bg-blue-400 rounded-lg p-2 flex justify-center items-center mt-5"
              onClick={handleSendCode}
            >
              Enviar
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Recuperar Senha</h1>
            <p className="text-zinc-400">
              Digite o código de recuperação enviado para seu e-mail.
            </p>

            <input
              type="text"
              placeholder="Código"
              className="border-2 border-zinc-300 rounded-lg p-2 mt-5"
              value={recoveryCode}
              onChange={(e) => setRecoveryCode(e.target.value)}
            />

            <button className="bg-blue-400 rounded-lg p-2 flex justify-center items-center mt-5">
              Verificar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecoveryPassPage;
