import { Role } from "@prisma/client";
import { z } from "zod";

export const ChangeUserRoleSchema = z
  .object({
    userId: z.string().cuid(),
    newRole: z.nativeEnum(Role),
  })
  .required();
