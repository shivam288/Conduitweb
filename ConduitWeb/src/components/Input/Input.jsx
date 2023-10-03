const Input = ({ type, name, placeholder, register, error, defaultValue = null }) => {
  return (
    <div className='form-floating has-validation mb-2'>
      <input
        type={type}
        className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        {...register(name)}
        defaultValue={defaultValue}
      />
      <label htmlFor={name}>{placeholder}</label>
      <p className='invalid-feedback m-0 ps-1'>{error?.message}</p>
    </div>
  );
}

export default Input
