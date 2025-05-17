// tools/contextInjector.ts

import { tool, DynamicStructuredTool, Tool } from "@langchain/core/tools";

type ToolFn<Args extends object, Return> = (args: Args) => Promise<Return>;

export function createContextInjectedTool<Args extends object, Return>(
  originalFn: (args: Args & { userId: number }) => Promise<Return>,
  userId: number,
  toolConfig: {
    name: string;
    schema: any;
    description?: string;
  }
): Tool {
  return tool((args: Args) => originalFn({ ...args, userId }), toolConfig);
}
