import * as yup from 'yup';

const signupScheam = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email')
    .max(50),
  username: yup
    .string()
    .required('Username is required')
    .max(50),
  password: yup
    .string()
    .required('Password is required')
    .max(50),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Password must match')
    .max(50)
});

export default signupScheam;