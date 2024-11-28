"use server";

import User from "@/models/User";
import connect from "@/lib/db";
import bcrypt from "bcryptjs";

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

  return "Cadastro realizado!";
};
