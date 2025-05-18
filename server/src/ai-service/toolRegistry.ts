import { setName, setNameSchema } from "@ai/tools/setName";
import { createContextInjectedTool } from "@ai/tools/context/contextInjector";

export const getTools = (userId: number) => [
  createContextInjectedTool(setName, userId, {
    name: "setName",
    schema: setNameSchema,
    description: "Updates the user name",
  }),
];
