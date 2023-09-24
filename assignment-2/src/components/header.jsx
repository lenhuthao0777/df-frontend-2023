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
          <User className='w-6 h-6 rounded-full shadow border border-zinc-700 dark:border-white' />
          <p className='ml-2 font-semibold text-sm'>Jayco</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
