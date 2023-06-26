import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trending } from 'assets'

const PostList = ({ posts }) => {
  return (
    <div className='hidden md:flex flex-col w-1/3 text-gray-900 ml-4 md:ml-8'>
      <div className='bg-white p-2 md:p-4 rounded-t-lg border-b-2 shadow-md'>
        <h1 className='text-sm md:text-lg font-bold uppercase flex'>Trending <span className='hidden lg:flex'> &nbsp;on Synapsis</span></h1>
      </div>
      <div className='bg-white h-screen overflow-auto rounded-b-lg px-2 md:px-4 pb-4'>
        {posts.map((post) => (
          <div key={post.id} className='flex items-center justify-between border-b-2 py-3 md:space-x-4'>
            <Link href={`/posts/${post.id}`}>
              <p className='font-semibold text-xs md:text-md lg:text-sm'>
                {post.title} <br />
                <span className='font-light text-xs md:text-sm text-blue-600 hover:underline'>Readmore...</span>
              </p>
            </Link>
              <Image src={Trending} alt='Post-List-Img' className='hidden md:flex md:w-20 md:h-20 rounded-lg cursor-pointer'/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostList
