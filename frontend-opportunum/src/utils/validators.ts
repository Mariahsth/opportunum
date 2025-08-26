export const isValidName = (name: string): boolean => {
    const regex = /^[A-Za-zÀ-ÿ\s]{3,}$/; // Ao menos 3 letras, apenas letras e espaços
    return regex.test(name.trim());
  };
  
  export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const isStrongPassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(password);
  };
  