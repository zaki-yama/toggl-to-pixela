export const generateGraphId = (description: string) => {
  return description.toLowerCase().replace(" ", "-").slice(16);
};
