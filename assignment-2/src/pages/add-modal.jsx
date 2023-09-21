import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import Modal from 'components/ui/modal';
import Select from 'components/ui/select';
import { useBook } from 'providers/book-provider';
import { useState } from 'react';

const AddModal = () => {
  const { state, dispatch } = useBook();
  const [values, setValues] = useState({});

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

  const handleForm = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <Modal open={isOpen} onClose={handleClose} title='Add book'>
      <form onSubmit={handleForm} className='w-full space-y-5'>
        <div className='flex flex-col'>
          <span className='text-xs font-semibold'>Name</span>
          <Input name='name' onChange={changeValues} />
        </div>

        <div className='flex flex-col'>
          <span className='text-xs font-semibold'>Author</span>
          <Input name='author' onChange={changeValues} />
        </div>

        <div className='flex flex-col'>
          <span className='text-xs font-semibold'>Topic</span>
          <Select
            options={options}
            name='topic'
            onChange={changeValues}
            placeholder='Choose a topic'
          />
        </div>

        <div className='flex justify-end'>
          <Button type='submit' variant='danger'>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddModal;