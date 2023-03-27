import useLoginModal from '@/hooks/useLoginModals';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import Input from '../Input';
import Modal from '../layout/Modal';

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post('api/register', {
        name,
        email,
        password,
        username,
      });
      toast.success('Account created');
      signIn('credentials', {
        email,
        password,
        username,
        name,
      });
      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }, [registerModal, name, email, password, username]);

  const onToggle = useCallback(() => {
    if (isLoading) return;
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        value={email}
        disabled={isLoading}
      />
      <Input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        value={name}
        disabled={isLoading}
      />

      <Input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
        value={username}
        disabled={isLoading}
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className=" text-neutral-400 text-center mt-4 ">
      <p>
        Already have an account?{' '}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create and account"
      actionLabel="Sign In"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
