import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import TagsInput from '../../components/TagsInput/TagsInput';
import TextArea from '../../components/TextArea/TextArea';
import { postArticle } from '../../services/articleApi';
import newArticleSchmea from './newArticleSchema';
import FullScreenLoading from '../../components/FullScreenLoading/FullScreenLoading';

const NewArticle = () => {

  const { register, formState: { errors }, handleSubmit, control } = useForm({
    resolver: yupResolver(newArticleSchmea)
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async data => {
    setIsLoading(true);
    try {
      await postArticle(data);
      navigate('/');
      return;
    }
    catch (error) {
      alert('Something went wrong!');
    }
    setIsLoading(true);
  }

  return (
    <>
      {isLoading && <FullScreenLoading width={200} />}
      <div className='full-height container'>
        <div className='row'>
          <form className='mt-2 offset-sm-2 col-sm-8 col-12' onSubmit={handleSubmit(handlePublish)}>
            <h2 className='text-center mb-3'>New Article</h2>
            <Input
              type='text'
              name='title'
              placeholder='Article Title'
              register={register}
              error={errors.title}
            />
            <Input
              type='text'
              name='description'
              placeholder={'What\'s this article about?'}
              register={register}
              error={errors.description}
            />
            <TextArea
              type='text'
              name='body'
              placeholder='Write your aritcle'
              register={register}
              error={errors.body}
              height='20rem'
            />
            <TagsInput name='tags' control={control} register={register} />
            <div className='mt-3 text-center'>
              <input type='submit' className='btn btn-lg btn-success float-end' value='Publish Article' />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewArticle;
