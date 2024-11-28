import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { Toaster } from "react-hot-toast";
import AppProvider from "@/context/appProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextAuth - Template",
  manifest: "/manifest.json",
  authors: [
    {
      name: "Bernardo Rodrigues",
      url: "https://www.linkedin.com/in/brodrigues0ll/",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <NextAuthSessionProvider>
        <AppProvider>
          <body className={inter.className}>
            {children}
            <Toaster position="top-right" />
          </body>
        </AppProvider>
      </NextAuthSessionProvider>
    </html>
  );
}
