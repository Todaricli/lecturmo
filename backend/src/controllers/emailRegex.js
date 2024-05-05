export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUOAEmail = (email) => {
  const aucklandUniEmailRegex = /^[^\s@]+@aucklanduni\.ac\.nz$/;
  return aucklandUniEmailRegex.test(email);
};
