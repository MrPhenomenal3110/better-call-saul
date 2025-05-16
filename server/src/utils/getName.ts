export const getNameFromEmail = (email: string) => {
  const firstPart = email.split("@")[0];
  const nameFromDot = firstPart?.split(".") || [];
  if (nameFromDot.length > 1) {
    return nameFromDot[0];
  }

  return firstPart;
};
