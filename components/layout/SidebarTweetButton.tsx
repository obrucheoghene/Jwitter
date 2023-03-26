import { useRouter } from 'next/router';
import { FaFeather } from 'react-icons/fa';

const SidebarTweetButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/')}
      className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 items-center justify-center bg-sky-500 hover:bg-opacity-80
  transition cursor-pointer"
    >
      {' '}
      <FaFeather size={24} color="white" />
    </div>
  );
};

export default SidebarTweetButton;
