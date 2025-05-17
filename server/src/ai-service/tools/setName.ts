import { tool } from "@langchain/core/tools";
import prisma from "@lib/prisma";
import { z } from "zod";

import { getContext } from "./context";

export const setName = async ({ name }: { name: string }) => {
  const { userId } = getContext();

  await prisma.user.update({
    where: { id: userId },
    data: { name },
  });

  return true;
};

export const setNameSchema = z.object({
  name: z.string(),
});

export const setNameTool = tool(setName, {
  name: "setName",
  schema: setNameSchema,
  description:
    "Updates the name of the user in the DB to a new name that the user wants.",
});
