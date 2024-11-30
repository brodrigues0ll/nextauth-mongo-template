"use server";

import nodemailer from "nodemailer";
import connect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const sendRecoveryCode = async (email) => {
  await connect();
  // Verificar se o email já está cadastrado
  const user = await User.findOne({ email }).where("email").equals(email);
  if (!user) {
    throw new Error("Email nao cadastrado!");
  }

  // Gerar um código aleatório de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 999999);

  // Salva o código no banco de dados
  await user.updateOne({
    recoveryCode: code,
    recoveryCodeExpires: Date.now() + 3 * 60 * 1000, // 3 minutos de expiração
  });

  // Configurar o transporte de email (substitua com suas credenciais de e-mail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_APP_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  // Email a ser enviado
  await transporter.sendMail({
    from: '"Next Auth Template" <your-email@gmail.com>',
    to: email,
    subject: "Recuperação de Senha - Código de Verificação",
    html: `
    <div style="background-color: #ffffff; height: 100vh; display: flex; flex-direction: column; color: #000000; align-items: center; justify-content: center;">
          <div style="display: flex; flex-direction: column; border: 2px solid #d1d5db; border-radius: 0.5rem; padding: 1.25rem 2.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);">
            <div style="display: flex; flex-direction: column;">
              <h1 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">
                Olá, aqui está o seu código de recuperação.
              </h1>
              <p style="color: #2563eb; font-weight: 700; font-size: 1.5rem; text-align: center; margin-top: 2.5rem;">
                ${code}
              </p>
            </div>
          </div>
        </div>
    `,
  });
};

// _______________________________________________________________________________

export const verifyRecoveryCode = async (email, code) => {
  await connect();

  const recoveryRecord = await User.findOne({ recoveryCode: code })
    .where("email")
    .equals(email);
  if (!recoveryRecord) {
    throw new Error("Código de recuperação inválido!");
  }
};

// _______________________________________________________________________________

export const resetPassword = async (email, code, newPassword) => {
  await connect();

  const recoveryRecord = await User.findOne({ recoveryCode: code })
    .where("email")
    .equals(email);
  if (!recoveryRecord) {
    throw new Error("Código de recuperação inválido!");
  }

  await recoveryRecord.updateOne({
    password: await bcrypt.hash(newPassword, 12),
  });
};
