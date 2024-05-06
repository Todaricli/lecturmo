export const isValidUOAEmail = (email) => {
  const aucklandUniEmailRegex = /^[^\s@]+@aucklanduni\.ac\.nz$/;
  return aucklandUniEmailRegex.test(email);
};