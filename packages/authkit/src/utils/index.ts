export const getUserDisplayName = (
  sessId: string,
  profile?:
    | {
        name: string;
      }
    | undefined
) => {
  if (profile && profile.name) {
    return profile.name;
  }
  return sessId ? `${sessId.slice(0, 8)}..${sessId.slice(-4)}` : "";
};
