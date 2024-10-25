/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

const locale = {
  mixed: {
    default: 'Campo inválido',
    required: 'Este campo é obrigatório',
    notType: 'Este campo é obrigatório',
    oneOf: 'Este campo é obrigatório',
    max: 'Este campo precisa ser menor ou igual a ${max}.',
    min: 'Este campo precisa ser maior ou igual a ${min}.',
  },
  string: {
    email: 'Este campo deve ser um e-mail válido',
    max: 'Este campo precisa ser menor ou igual a ${max}.',
    min: 'Este campo precisa ser maior ou igual a ${min}.',
    length: 'O tamanho deste campo precisa ser igual a ${length}.',
  },
  number: {
    max: 'Este campo precisa ser menor ou igual a ${max}.',
    min: 'Este campo precisa ser maior ou igual a ${min}.',
  },
};

yup.setLocale(locale);

export default yup;
