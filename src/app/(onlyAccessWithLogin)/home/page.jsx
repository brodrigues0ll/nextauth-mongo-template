"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

const page = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setUser(data.user);
    };
    getUser();
  }, []);

  if (!user) return null;
  return (
    <div className="bg-white h-screen flex flex-col text-black items-center justify-center gap-5">
      <p className="text-zinc-400">
        Essa página é acessível apenas quando você está logado.
      </p>
      <div className="flex flex-col border-2 porder-zinc-300 rounded-lg py-5 px-10 shadow-xl">
        <h1>Olá, {user.name}!!</h1>
        <p>Bem-Vindo(a) a minha aplicação 💘</p>
      </div>
      <button
        className="bg-blue-400 rounded-lg px-5 py-2 flex justify-center items-center"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default page;
