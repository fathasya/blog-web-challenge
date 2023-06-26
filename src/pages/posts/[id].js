import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostDetail from '../../components/organisms/PostDetail';
import { getPost, getPosts, getComments, getUser } from '../../constants/api.js';
import MainLayout from 'layouts/MainLayout';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      const postData = await getPost(id);
      const postDatas = await getPosts()
      const commentData = await getComments(id);
      const userData = await getUser(postData.userId);

      setPost(postData);
      setPosts(postDatas)
      setComments(commentData);
      setUser(userData);
    };

    if (id) {
      fetchPostData();
    }
  }, [id]);

  if (!post || !user) {
    return (
      <MainLayout>
        <div className='w-full h-screen flex justify-center items-start text-lg'>Loading...</div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <PostDetail post={post} posts={posts} comments={comments} user={user} />
    </MainLayout>
  ) 
}

export default PostPage;
