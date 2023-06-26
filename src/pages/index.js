import React, { useEffect, useState } from 'react'
import { getPosts } from '../constants/api.js'
import MainLayout from 'layouts/MainLayout'
import Image from 'next/image'
import { ChevronIcon, Hero } from 'assets'
import Link from 'next/link.js'

const HomePage = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <MainLayout>
      <div className='w-full md:w-2/3 min-h-full bg-white p-5 rounded-lg text-gray-900 md:text-justify'>
        <div className='flex overflow-auto text-xs bg-gray-50 border-gray-500 border-l-4 pl-2 text-gray-900'>
          {posts.map((post, i) => (
            <div key={post.id} className='bg-gray-50 px-1 py-2 md:space-x-4'>
              <Link href={`/posts/${post.id}`} className='flex flex-row overflow-auto'>
                <p className='text-xs'>News{i+1}</p>
                {i !== posts.length - 1 && (
                  <ChevronIcon />
                )}
              </Link>
            </div>
          ))}
        </div>
        <Image src={Hero} alt='Hero-Img' />
        <h1 className='font-bold uppercase text-sm lg:text-xl my-3'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h1>
        <p className='leading-loose text-xs lg:text-lg'>
          Fusce ut tristique velit. Nullam eu arcu consectetur, condimentum erat id, cursus orci. Aenean ultrices odio sed fringilla laoreet. Mauris eget orci eu lorem commodo iaculis. Nulla maximus scelerisque dolor, sit amet congue enim cursus id. Integer vitae elementum nisl. Vivamus consectetur risus ac augue congue, in faucibus elit cursus. <br/>
          Proin in volutpat ex. Integer et feugiat odio. Duis eu justo a lectus consequat ullamcorper non nec massa. Aliquam tempus enim eget felis aliquet, non placerat purus malesuada. Sed a purus vel odio vestibulum maximus. Etiam ut mauris et risus semper commodo. Sed ut dapibus risus, vel scelerisque ipsum. Proin nec ligula vel nunc elementum varius nec sed velit. Sed scelerisque lorem at dui lobortis, id consectetur elit euismod.
        </p>
      </div>
    </MainLayout>
  )
}

export default HomePage
