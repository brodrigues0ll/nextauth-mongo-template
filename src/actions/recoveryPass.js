"use server";

import nodemailer from "nodemailer";

export const recoveryPass = async (email) => {
  try {
    // Gerar um código aleatório de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000);

    // Configurar o transporte de email (substitua com suas credenciais de e-mail)
    const transporter = nodemailer.createTransport({
      service: "gmail", // ou 'smtp.protonmail.com' ou outro serviço de sua escolha
      auth: {
        user: process.env.GOOGLE_APP_EMAIL, // substitua pelo seu e-mail
        pass: process.env.GOOGLE_APP_PASSWORD, // substitua pela senha do seu e-mail
      },
    });

    // Configurar o email
    const mailOptions = {
      from: '"Next Auth Template" <sullivan9909@gmail.com>', // remetente
      to: email, // destinatário
      subject: "Recuperação de Senha - Código de Verificação",
      text: `Seu código de recuperação é: ${code}`,
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
    };

    // Enviar o email
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado: %s", info.messageId);

    return code; // Retornar o código para uso posterior, como salvar no banco de dados
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    throw new Error("Não foi possível enviar o código de recuperação.");
  }
};
