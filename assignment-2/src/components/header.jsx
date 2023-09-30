import { User } from 'lucide-react';
import { useTheme } from 'providers/theme-provider';
const Header = () => {
  const { ButtonMode } = useTheme();

  return (
    <div className='w-full py-5 bg-white dark:text-white dark:bg-black shadow-md fixed top-0 left-0'>
      <div className='container mx-auto flex items-center justify-between'>
        <h2 className='text-xl dark:text-white font-extrabold'>Book store</h2>
        <div className='flex items-center'>
          <ButtonMode />
          <div className='flex items-center justify-center w-10 h-10 border border-zinc-900 dark:border-white rounded-full overflow-hidden ml-2'>
            <User className='w-5 h-5' />
          </div>
          <p className='ml-2 font-semibold text-sm'>Jayco</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
