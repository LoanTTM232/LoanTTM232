import * as Yup from 'yup';

export const emailValidate = Yup.string()
  .email('Please enter valid email')
  .required('Email is required')
  .label('Email');

export const passwordValidate = Yup.string()
  .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
  .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
  .matches(/\d/, 'Password must have a number')
  .min(8, ({ min }) => `Password must be at least ${min} characters`)
  .required('Password is required')
  .label('Password');

export const confirmPasswordValidate = Yup.string().oneOf(
  [Yup.ref('password')],
  'Passwords must match'
);

export const loginValidation = Yup.object().shape({
  email: emailValidate,
  password: passwordValidate,
});

export const registerValidation = Yup.object().shape({
  email: emailValidate,
  password: passwordValidate,
  confirmPassword: confirmPasswordValidate,
});
