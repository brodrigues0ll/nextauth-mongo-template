import { recoveryPass } from "@/actions/recoveryPass";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "E-mail é obrigatório." }), {
        status: 400,
      });
    }

    const code = await recoveryPass(email);

    return new Response(
      JSON.stringify({ success: true, message: "Código enviado.", code }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao enviar o código.");
    return new Response(JSON.stringify({ error: "Erro ao enviar o código." }), {
      status: 500,
    });
  }
}
