import * as yup from 'yup';

const signinSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email')
    .max(50),
  password: yup
    .string()
    .required('Password is required')
    .max(50)
});

export default signinSchema;