import useCurrentUser from '@/hooks/useCurrentUsers';
import useLoginModal from '@/hooks/useLoginModal';
import usePosts from '@/hooks/usePosts';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import Avatar from './Avatar';
import Button from './layout/Button';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      await axios.post('/api/posts', { body });
      toast.success('Tweet created');
      setBody('');
      mutatePosts();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);
  return (
    <div className=" border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className=" flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className=" w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder={placeholder}
              className="disabled:opacity-80 peer resize-none mt-3 bg-black w-full ring-0 outline-none text-[20px] placeholder-neutral-500 "
            ></textarea>
          </div>
        </div>
      ) : (
        <div className=" py-8">
          <h1 className=" text-white text-center text-2xl mb-4 font-bold">
            Welcome to Twitter
          </h1>

          <div className=" flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
