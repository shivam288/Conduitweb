import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import signupSchema from './signupSchema';
import { signup } from '../../services/userApi';
import { useState } from 'react';
import FullScreenLoading from '../../components/FullScreenLoading/FullScreenLoading';
import UserContext from '../../components/UserContext/UserContext';
import { saveUser } from '../../util/localStorageUtil';

const Signup = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { register, formState: { errors }, handleSubmit, setError } = useForm({
    resolver: yupResolver(signupSchema)
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user.isSignedIn) {
      navigate('/');
    }
  }, [user]);

  const handleSignup = async data => {
    setIsLoading(true);
    try {
      const response = await signup(data);
      saveUser(response, setUser);
      navigate('/');
    }
    catch (error) {
      switch (error.response?.status) {
        case 409:
          setError(error.response?.data?.name, { message: error.response?.data?.message })
          break;
        default:
          alert('Something went wrong!')
      }
    }
    setIsLoading(false);
  }

  return (
    <div className='d-flex justify-content-center align-items-center w-100 full-height'>
      {isLoading && <FullScreenLoading width={140} />}
      <form className='mb-5' onSubmit={handleSubmit(handleSignup)}>
        <h1 className='text-center'>Sign Up</h1>
        <p className='mb-3 text-center'>Please enter your details</p>
        <Input
          type='text'
          name='email'
          placeholder='Email Address'
          register={register}
          error={errors.email}
        />
        <Input
          type='text'
          name='username'
          placeholder='Username'
          register={register}
          error={errors.username}
        />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          register={register}
          error={errors.password}
        />
        <Input
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          register={register}
          error={errors.confirmPassword}
        />
        <input type='submit' className='btn btn-lg btn-success w-100 mt-1' value='Sign Up' />
        <div className='mt-4 text-center'>
          <p>
            Already have a account?{' '}
            <Link to='/signin' className='fw-bold text-decoration-none link-primary'>Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
