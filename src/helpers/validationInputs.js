const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};
const validateName = (name) => {
  return name.match(
    /^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/,
  );
};
const validateNumber = (number) => {
  return number.match(/^[0-9]{0,2}$/);
};
const validateAddress = (address) => {
  return address.match(/^[a-zA-Z0-9\s,.'-]{3,}$/);
};
const validateDate = (date) => {
  let dateAtual = new Date().toISOString().split('T')[0];
  if (date > dateAtual) {
    return true;
  }
};

export default function validationInputs(inputs) {
  const error = [];
  if (!validateName(inputs.nome)) {
    error.push('Nome inválido!');
  }
  if (!validateNumber(inputs.idade)) {
    error.push('Idade inválida!');
  }
  if (!validateEmail(inputs.email)) {
    error.push('E-mail inválido!');
  }

  if (!validateAddress(inputs.endereco)) {
    error.push('Por favor, coloque um endereço valido!');
  }
  if (validateDate(inputs.data)) {
    error.push('Por favor, insira a data corretamente');
  }

  return error;
}
