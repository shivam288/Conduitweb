import * as yup from 'yup';

const addCommentSchema = yup.object({
  body: yup
    .string()
    .required('Can not add empty comment')
    .max(250)
});

export default addCommentSchema;
