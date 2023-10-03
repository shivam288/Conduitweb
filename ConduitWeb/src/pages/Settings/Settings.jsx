import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import UserContext from '../../components/UserContext/UserContext';
import TextArea from '../../components/TextArea/TextArea';
import FullScreenLoading from '../../components/FullScreenLoading/FullScreenLoading';
import { update } from '../../services/userApi';
import { saveUser } from '../../util/localStorageUtil';
import { yupResolver } from '@hookform/resolvers/yup';
import settingSchema from './settingsSchema';

const Settings = () => {

  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { register, formState: { errors }, handleSubmit, setError } = useForm({
    resolver: yupResolver(settingSchema)
  });
  const navigate = useNavigate();

  const handleUpdate = async data => {
    setIsLoading(true);
    try {
      await update(data);
      saveUser({
        ...user,
        username: data.username,
        bio: data.bio
      }, setUser);
      navigate('/');
    }
    catch (error) {
      switch (error.response?.status) {
        case 409:
          setError('username', { message: 'Username already exist' });
          break;
        default:
          alert('Something went wrong!');
      }
    }
    setIsLoading(false);
  }

  return (
    <div className='d-flex justify-content-center align-items-center w-100 full-height'>
      {isLoading && <FullScreenLoading width={140} />}
      <form className='mb-5' onSubmit={handleSubmit(handleUpdate)}>
        <h2 className='text-center mb-3'>Your Settings</h2>
        <Input
          type='text'
          name='username'
          placeholder='Username'
          defaultValue={user.username}
          register={register}
          error={errors.username}
        />
        <TextArea
          type='text'
          name='bio'
          placeholder='Short bio about you'
          defaultValue={user.bio}
          register={register}
          error={errors.bio}
        />
        <div>
          <input type='submit' className='btn btn-lg btn-success w-100 mt-1' value='Update' />
          <Link to='/settings/changepassword' className='btn btn-lg btn-danger w-100 mt-1'>Change Password</Link>
        </div>
      </form>
    </div>
  );
}

export default Settings;
