import useCurrentUser from '@/hooks/useCurrentUsers';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface PostItemProps {
  userId: string;
  data: Record<string, any>;
}
const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const gotoUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/user/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const gotoPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, []);
  return <div>PostItem</div>;
};

export default PostItem;
