export const getAge = (bridthDate: string) => {
  return new Date().getFullYear() - new Date(bridthDate).getFullYear() - 1;
};
