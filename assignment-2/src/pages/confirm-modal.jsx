import { Fragment, useState } from 'react';

import { Button } from 'components/ui/button';
import Modal from 'components/ui/modal';
import { useBook } from 'providers/book-provider';
import BookService from 'api/book';

const ConfirmModal = () => {
  const { state, dispatch } = useBook();

  const [isLoading, setIsLoading] = useState(false);

  const isOpen = state.isOpen && state.type === 'confirmModal';

  const handleClose = () => {
    dispatch({ type: 'onClose' });
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await BookService.destroy(state.bookId);
      setIsLoading(false);
      handleClose();
      window.location.reload();
    } catch (error) {
      return error;
    }
  };

  return (
    <Fragment>
      <Modal open={isOpen} onClose={handleClose}>
        <div className='mt-2'>
          <h2 className='text-center text-lg font-semibold'>Delete book</h2>
          <div className='text-center mt-2'>
            <p className='text-sm'>Do you want to delete</p>
            <span className='text-sm font-extrabold mr-1'>{state.name}</span>
            <span className='text-sm'>book?</span>
          </div>

          <div className='flex items-center justify-evenly mt-10'>
            <Button
              variant='outline'
              disable={isLoading}
              onClick={() => dispatch({ type: 'onClose' })}
            >
              Cancel
            </Button>
            <Button disable={isLoading} variant='danger' onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ConfirmModal;
