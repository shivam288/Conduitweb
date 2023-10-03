import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import styles from './TagsInput.module.css';

const TagsInput = ({ control, register, name }) => {

  const { fields, append, remove } = useFieldArray({
    control,
    name: name
  });
  const [currentTag, setCurrentTag] = useState('');

  const handleCurrentTagChange = event => {
    setCurrentTag(event.target.value);
  }

  const handleAppend = () => {
    setCurrentTag('');
    append(currentTag);
  }

  return (
    <>
      <ul className='d-flex align-items-center justify-content-start flex-wrap ps-1 mb-1'>
        {fields.map((field, index) => (
          <li key={field.id} className='list-unstyled me-1 mb-1'>
            <div className='input-group'>
              <input
                className={`btn btn-sm btn-outline-success px-0 opacity-100 ${styles.tagButton}`}
                {...register(`${name}.${index}`)}
                disabled
              />
              <button
                className={`btn btn-sm btn-success ${styles.deleteButton}`}
                onClick={() => remove(index)}
                defaultValue='&#x2715;'
              >
                &#x2715;
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className='input-group'>
        <input className='form-control' value={currentTag} onChange={handleCurrentTagChange} placeholder='Tag' />
        <button className='btn btn-success' type="button" onClick={handleAppend}>Add Tag</button>
      </div>
    </>
  );
}

export default TagsInput;
