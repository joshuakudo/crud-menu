export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);;
}

export const clearLocalStorage = async () => {
  try {
    window.localStorage.clear()
  } catch (error) {

  }
}
export const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}