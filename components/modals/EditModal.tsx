import useCurrentUser from '@/hooks/useCurrentUsers';
import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ImageUpload from '../ImageUpload';
import Input from '../Input';
import Modal from '../layout/Modal';

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [currentUser]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      mutateFetchedUser();
      toast.success;

      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    }
    mutateFetchedUser();
  }, [
    name,
    username,
    bio,
    profileImage,
    coverImage,
    mutateFetchedUser,
    editModal,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />

      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
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
        onChange={(e) => setBio(e.target.value)}
        type="text"
        placeholder="Bio"
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
