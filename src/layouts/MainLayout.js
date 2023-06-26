import { useEffect, useState } from 'react';
import { Footer, Navbar, PostList } from '../components/organisms'
import { getPosts } from '../constants/api.js';

const MainLayout = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };

    fetchPosts();
  }, []);
  return(
    <div className='w-full h-full bg-gray-50'>
      <Navbar />
      <div className='flex justify-between p-2 md:p-5 lg:p-10'>
        {children}
        <PostList posts={posts} />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout