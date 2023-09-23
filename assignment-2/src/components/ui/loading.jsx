import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-screen bottom-0 bg-gray-100 bg-opacity-30 flex items-center justify-center'>
      <Loader2 className='w-10 h-10' />
    </div>
  );
};

export default Loading;
