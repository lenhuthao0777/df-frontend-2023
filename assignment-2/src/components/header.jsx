import { User } from 'lucide-react';
const Header = () => {
  return (
    <div className='py-5 bg-white shadow-md fixed top-0 left-0 w-full'>
      <div className='container mx-auto flex items-center justify-between'>
        <h2 className='text-xl font-extrabold'>Book store</h2>
        <div className='flex items-center'>
          <User className='w-6 h-6 rounded-full shadow border border-zinc-700' />
          <p className='ml-2 font-semibold text-sm'>Jayco</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
