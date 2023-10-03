import * as yup from 'yup';

const settingSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .max(50),
  bio: yup
    .string()
    .max(200)
});

export default settingSchema;
