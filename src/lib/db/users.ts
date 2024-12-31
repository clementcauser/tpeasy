"use server";

import { z } from "zod";
import { prisma } from "./prisma";
import { SignupFormSchema } from "../validation/auth";
import { saltAndHashPassword } from "../utils/password";
import { ChangeUserRoleSchema } from "../validation/users";
import { Role } from "@prisma/client";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { company: true },
  });
}

type CreateUserPayload = Omit<z.infer<typeof SignupFormSchema>, "confirm">;

export async function createUserWithCredentials({
  email,
  firstName,
  lastName,
  password: _password,
}: CreateUserPayload) {
  const password = await saltAndHashPassword(_password);

  return prisma.user.create({
    data: {
      email,
      password,
      name: `${firstName} ${lastName}`,
    },
  });
}

type ChangeUserRolePayload = z.infer<typeof ChangeUserRoleSchema>;

export async function changeUserRole({
  userId,
  newRole,
}: ChangeUserRolePayload) {
  return prisma.user.update({
    data: { role: newRole as Role },
    where: { id: userId },
  });
}
