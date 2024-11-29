"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  sendRecoveryCode,
  verifyRecoveryCode,
  resetPassword,
} from "@/actions/recoveryPass";
import { useRouter } from "next/navigation";

const RecoveryPassPage = () => {
  const [email, setEmail] = useState("");
  const [sentCode, setSentCode] = useState(false);
  const [isResetingPassword, setIsResetingPassword] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const router = useRouter();

  const handleSendCode = async () => {
    try {
      await sendRecoveryCode(email);
      toast.success("Código enviado com sucesso! Verifique seu e-mail.");
      setSentCode(true);
      setIsResetingPassword(false); // Indicar que está pronto para resetar a senha
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await verifyRecoveryCode(email, recoveryCode);
      toast.success("Código verificado com sucesso!");
      setIsResetingPassword(true); // Indicar que o código foi verificado e pode resetar a senha
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(email, recoveryCode, newPassword);
      toast.success("Senha resetada com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col text-black items-center justify-center">
      <div className="flex flex-col border-2 border-zinc-300 rounded-lg py-5 px-10 shadow-xl">
        {/* Etapa 1: Enviar código */}
        {!sentCode && !isResetingPassword && (
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
        )}

        {/* Etapa 2: Verificar código */}
        {sentCode && !isResetingPassword && (
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

            <button
              className="bg-blue-400 rounded-lg p-2 flex justify-center items-center mt-5"
              onClick={handleVerifyCode}
            >
              Verificar
            </button>
          </div>
        )}

        {/* Etapa 3: Resetar senha */}
        {isResetingPassword && (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Recuperar Senha</h1>
            <p className="text-zinc-400">
              Agora você pode resetar sua senha. O código foi verificado com
              sucesso!
            </p>

            <input
              type="password"
              placeholder="Nova Senha"
              className="border-2 border-zinc-300 rounded-lg p-2 mt-5"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              className="bg-blue-400 rounded-lg p-2 flex justify-center items-center mt-5"
              onClick={handleResetPassword}
            >
              Resetar Senha
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecoveryPassPage;
