// context.ts
export interface RequestContext {
  userId: number;
  sessionId: number;
}

let currentContext: RequestContext | null = null;

export function setContext(ctx: RequestContext) {
  currentContext = ctx;
}

export function getContext() {
  if (!currentContext) throw new Error("No context set");
  return currentContext;
}
