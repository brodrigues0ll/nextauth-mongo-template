"use server";

import User from "@/models/User";
import PendingUser from "@/models/PendingUser";
import connect from "@/lib/db";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendCodeToConfirmEmail = async (user) => {
  const { name, surname, email, password } = user;

  if (!name || !surname || !email || !password) {
    throw new Error("Preencha todos os campos!");
  }

  await connect();
  // Gerar um código aleatório de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 900000);

  // Verificar se o email já está cadastrado
  const isEmailVerified = await User.findOne({ email });

  // Verificar se o email já está pendente de confirmação
  const isEmailPending = await PendingUser.findOne({ email });

  // Configuração do transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_APP_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  // HTML do email de confirmação
  const htmlToSend = `
      <div style="background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
        <div style="background-color: #007bff; color: #ffffff; padding: 20px; border-radius: 5px;">
          <h1 style="margin: 0;">Next Auth Template - Confirmação de Email</h1>
        </div>
        <div style="margin: 20px 0;">
          <h2>Olá, aqui está o seu código de confirmação:</h2>
          <p style="font-size: 24px; font-weight: bold; color: #2563eb;">${code}</p>
          <p>O código expira em 3 minutos.</p>
        </div>
        <footer style="margin-top: 20px; font-size: 12px; color: #999;">
          <p>&copy; ${new Date().getFullYear()} Your-Brand-Name. Todos os direitos reservados.</p>
          <p>Se você tiver alguma dúvida, entre em contato pelo e-mail 
            <a href="mailto:support@yourapp.com" style="color: #007bff; text-decoration: none;">support@yourapp.com</a>.
          </p>
        </footer>
      </div>
    `;

  if (isEmailVerified) {
    throw new Error("Email já utilizado!");
  }

  if (isEmailPending) {
    await isEmailPending.updateOne({
      code,
    });
    await transporter.sendMail({
      from: '"Next Auth Template" <your-email@gmail.com>',
      to: email,
      subject: "Confirmação de Email - Código de Verificação",
      html: htmlToSend,
    });
    return "Código enviado!";
  }

  await PendingUser.create({
    email,
    code,
  });

  await transporter.sendMail({
    from: '"Next Auth Template" <your-email@gmail.com>',
    to: email,
    subject: "Confirmação de Email - Código de Verificação",
    html: htmlToSend,
  });
};

export const verifyCode = async (email, code) => {
  await connect();

  // Verificar se o email já está cadastrado
  const pendingUser = await PendingUser.findOne({ email })
    .where("email")
    .equals(email);

  if (!pendingUser) {
    throw new Error("Código de confirmação inválido!");
  }

  // Verificar se o código está correto
  const isCodeSame = pendingUser.code === code;
  if (!isCodeSame) {
    throw new Error("Código de confirmação inválido!");
  }

  return "Código de confirmação verificado!";
};

export const addUser = async (user) => {
  const { name, surname, email, password } = user;
  await connect();

  if (!name || !surname || !email || !password) {
    throw new Error("Preencha todos os campos!");
  }

  const existing = await User.findOne({ email }).where("email").equals(email);

  if (existing) {
    throw new Error("Email já cadastrado!");
  }

  const newUser = new User({
    name,
    surname,
    email,
    password: await bcrypt.hash(password, 12),
  });

  await newUser.save();
  await PendingUser.deleteOne({ email });

  return "Cadastro realizado!";
};
