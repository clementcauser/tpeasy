import { Role } from "@prisma/client";
import { z } from "zod";
import { objectIdSchema } from "./common";

export const ChangeUserRoleSchema = z
  .object({
    userId: objectIdSchema,
    newRole: z.nativeEnum(Role),
  })
  .required();
