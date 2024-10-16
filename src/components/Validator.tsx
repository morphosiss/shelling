export const validateUserName = (value: string): string => {
  if (/^\d/.test(value)) {
    return "Seu username não pode começar com números";
  } else if (value.length >= 1 && value.length < 3) {
    return "Seu username deve ter no mínimo 3 caracteres";
  } else if (value.length > 20) {
    return "Seu username deve ter no máximo 20 caracteres";
  }
  return "";
};

export const validateEmail = (value: string): string => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && value.length > 0) {
    return "Email inválido";
  }
  return "";
};

export const validatePass = (value: string): string => {
  if (value.length < 8 && value.length > 0) {
	return "A password deve ter no mínimo 8 caracteres";
  }
  return "";
}
