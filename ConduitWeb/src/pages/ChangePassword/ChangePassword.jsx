import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import FullScreenLoading from '../../components/FullScreenLoading/FullScreenLoading';
import changePasswordSchema from './changePasswordSchema';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/userApi';

const ChangePassword = () => {

  const { register, formState: { errors }, handleSubmit, setError } = useForm({
    resolver: yupResolver(changePasswordSchema)
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async data => {
    setIsLoading(true);
    try {
      await changePassword(data);
      navigate('/');
    }
    catch (error) {
      switch (error.response?.status) {
        case 403:
          setError('oldPassword', { message: 'Wrong password' });
          break;
        default:
          alert('Unable to change password');
      }
    }
    setIsLoading(false);
  }

  return (
    <div className='d-flex justify-content-center align-items-center w-100 full-height'>
      {isLoading && <FullScreenLoading width={120} />}
      <form className='mb-5' onSubmit={handleSubmit(handleChangePassword)}>
        <h2 className='text-center mb-3'>Change Password</h2>
        <Input
          type='password'
          name='oldPassword'
          placeholder='Old Password'
          register={register}
          error={errors.oldPassword}
        />
        <Input
          type='password'
          name='newPassword'
          placeholder='New Password'
          register={register}
          error={errors.newPassword}
        />
        <Input
          type='password'
          name='confirmNewPassword'
          placeholder='Confirm New Password'
          register={register}
          error={errors.confirmNewPassword}
        />
        <input type='submit' className='btn btn-lg btn-success w-100' value='Change Password' />
      </form>
    </div>
  );
}

export default ChangePassword;
