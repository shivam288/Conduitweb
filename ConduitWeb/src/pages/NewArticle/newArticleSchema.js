import * as yup from 'yup';

const newArticleSchmea = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(100),
  description: yup
    .string()
    .required('Description is required')
    .max(250),
  body: yup
    .string()
    .required('Article body is required')
    .max(10000),
  tags: yup
    .array()
});

export default newArticleSchmea;
