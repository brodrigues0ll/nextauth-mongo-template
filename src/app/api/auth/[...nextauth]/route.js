import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        await connect();

        const user = await User.findOne({ email: credentials.email }).lean();

        if (!user) {
          throw new Error("Email ou Senha incorretos. 🥺");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Email ou Senha incorretos. 🥺");
        }

        // Retorna o objeto user, que estará disponível na sessão
        return {
          id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          role: user.role, // Se você tem um campo de role ou qualquer outro dado que queira incluir
        };
      },
    }),
  ],
  pages: {
    signIn: "/", // Define a página de login
  },
  session: {
    strategy: "jwt", // Usando JWT para sessões
    maxAge: 240 * 60 * 60, // 10 dia de validade para o token
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Adiciona role ao token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // Passa role para a sessão
      }
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
