import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signin } from '../../services/userApi';
import { Link, useNavigate } from 'react-router-dom';
import FullScreenLoading from '../../components/FullScreenLoading/FullScreenLoading';
import Input from '../../components/Input/Input';
import signinSchema from './signinSchema';
import UserContext from '../../components/UserContext/UserContext';
import { saveUser } from '../../util/localStorageUtil';

const Signin = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { register, formState: { errors }, handleSubmit, setError } = useForm({
    resolver: yupResolver(signinSchema)
  });
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isSignedIn) {
      navigate('/');
    }
  }, [user]);

  const handleSignin = async data => {
    setIsLoading(true);
    try {
      const response = await signin(data);
      saveUser(response, setUser);
      navigate('/');
    }
    catch (error) {
      switch (error.response?.status) {
        case 401:
          setError('password', { message: 'Wrong password' });
          break;
        case 404:
          setError('email', { message: 'Email not found' });
          break;
        default:
          alert('Something went wrong!');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className='d-flex justify-content-center align-items-center w-100 full-height'>
      {isLoading && <FullScreenLoading width={100} />}
      <form className='mb-5' onSubmit={handleSubmit(handleSignin)}>
        <h1 className='text-center'>Sign In</h1>
        <p className='mb-3 text-center'>Please enter your email and password</p>
        <Input type='text' name='email' placeholder='Email Address' register={register} error={errors.email} />
        <Input type='password' name='password' placeholder='Password' register={register} error={errors.password} />
        <input type='submit' className='btn btn-lg btn-success w-100' value='Sign In' />
        <div className='mt-4 text-center'>
          <p>
            Don't have an account?{' '}
            <Link to='/signup' className='fw-bold text-decoration-none link-primary'>Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin;
