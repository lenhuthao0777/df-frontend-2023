import { useState } from 'react';

import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import Modal from 'components/ui/modal';
import Select from 'components/ui/select';
import { useBook } from 'providers/book-provider';
import { v4 as uuid } from 'uuid';

const AddModal = () => {
  const { state, dispatch } = useBook();

  const [values, setValues] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const isOpen = state.isOpen && state.type === 'addBook';

  const handleClose = () => {
    dispatch({ type: 'onClose' });
  };

  const options = [
    {
      id: 1,
      label: 'Programming',
      value: 'Programming',
    },
    {
      id: 2,
      label: 'Database',
      value: 'Database',
    },
    {
      id: 3,
      label: 'Devops',
      value: 'Devops',
    },
  ];

  const changeValues = (e) => {
    const target = e.target;
    setValues((pre) => ({
      ...pre,
      [target.name]: target.value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const dataLocal = JSON.parse(localStorage.getItem('books'));
    dataLocal.push({
      id: uuid(),
      name: values.name,
      author: values.author,
      topic: values.topic,
    });

    setTimeout(() => {
      if (values) {
        const newData = JSON.stringify(dataLocal);
        localStorage.setItem('books', newData);
      }
      handleClose();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Modal open={isOpen} onClose={handleClose} title='Add book'>
      <form onSubmit={handleForm} className='w-full space-y-5 dark:text-white'>
        <div className='flex flex-col'>
          <label htmlFor='name' className='text-xs font-semibold'>
            Name
          </label>
          <Input name='name' placeholder='Enter name' onChange={changeValues} />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='author' className='text-xs font-semibold'>
            Author
          </label>
          <Input
            name='author'
            placeholder='Enter author'
            onChange={changeValues}
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='topic' className='text-xs font-semibold'>
            Topic
          </label>
          <Select
            options={options}
            name='topic'
            onChange={changeValues}
            placeholder='Choose a topic'
          />
        </div>

        <div className='flex justify-end'>
          <Button isLoading={isLoading} type='submit' variant='danger'>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddModal;
