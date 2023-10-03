import * as yup from 'yup';

const changePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required('Old Password is required')
    .max(50),
  newPassword: yup
    .string()
    .required('New Password is required')
    .max(50),
  confirmNewPassword: yup
    .string()
    .required('Confirm New Password is required')
    .oneOf([yup.ref('newPassword'), null], 'Password must match')
    .max(50)
});

export default changePasswordSchema;
