import useCurrentUser from '@/hooks/useCurrentUsers';
import useLoginModal from '@/hooks/useLoginModal';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import Avatar from '../Avatar';

interface PostItemProps {
  userId?: string;
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
  }, [router, data.id]);

  const onlike = useCallback(
    (event: any) => {
      event.stopPropagation();

      loginModal.onOpen();
    },
    [loginModal]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);
  return (
    <div
      onClick={gotoPost}
      className="border-b-[1px]
  border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row item-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className=" flex flex-row items-center gap-2">
            <p
              onClick={gotoUser}
              className="text-white
                font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span
              onClick={gotoUser}
              className=" text-neutral-500 
            cursor-pointer hover:underline hidden md:block"
            >
              @{data.user.username}
            </span>
            <span className=" text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className=" text-white mt-1">{data.body}</div>
          <div className=" flex flex-row items-center mt-3 gap-10">
            <div className=" flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>

            <div
              onClick={onlike}
              className=" flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <AiOutlineHeart size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
