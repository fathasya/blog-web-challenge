import { CommentIcon, LikeIcon, ShareIcon, News, User, ChevronIcon } from 'assets'
import { ButtonSubmit, Buttons, InputComment } from 'components/atoms'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const PostDetail = ({ post, posts, comments: apiComments, user }) => {
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [shareCount, setShareCount] = useState(0)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [allComments, setAllComments] = useState([])

  useEffect(() => {
    setAllComments([...apiComments, ...comments])
  }, [apiComments, comments])

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
      setIsLiked(false)
    } else {
      setLikeCount(likeCount + 1)
      setIsLiked(true)
    }
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handlePostComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        id: comments.length + 1,
        name: 'Anonymous',
        body: comment,
      }

      setComments([...comments, newComment])
      setAllComments([...apiComments, ...comments, newComment])
      setComment('')
    }
  }

  useEffect(() => {
    setShareCount(0)
    setComments([])
  }, [post.title])

  return (
    <div className='w-full md:w-4/6 h-full bg-white px-3 md:p-5'>
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
      <h1 className='font-bold text-lg md:text-3xl text-gray-900 my-4'>{post.title}</h1>
      <Image
        src={News} className='w-full rounded' alt='News-Img'
      />
      <p className='text-gray-900 text-sm md:text-md lg:text-lg my-4'>{post.body}</p>
      <div className='flex justify-end space-x-1 md:space-x-4 my-4 text-xs md:text-md'>
        <Buttons 
          onClick={handleLike}
          icon={ <LikeIcon/>} 
          text={`${likeCount} `}
        />
        <Buttons
          icon={ <CommentIcon/> }
          text={`${allComments.length} `}
        />

        <Buttons
          onClick={() => setShareCount(shareCount+1)}
          icon={ <ShareIcon/> }
          text={`${shareCount}`}
        />
      </div>

      <div className='py-2 md:py-4'>
        <div className='border-l-8 bg-gray-100 border-blue-300 px-2 md:px-4 py-2 md:my-4'>
          <h2 className='font-semibold text-xs md:text-xl text-gray-900'>Comments</h2>
        </div>
        <div className='space-y-4 my-5 md:my-8'>
          <InputComment value={comment} onChange={handleCommentChange}/>
          <ButtonSubmit 
            onClick={handlePostComment} 
            text={`Post Comment`}
          />
        </div>
        <ul>
          {allComments.map((comment) => (
            <li key={comment.id} className='my-2 md:my-4'>
              <div className='flex space-x-3'>
                <Image 
                  src={User}
                  className='w-6 h-6 md:w-8 md:h-8'
                  alt='User-Icon'
                />
                <div className='space-y-1 md:space-y-2 text-gray-900'>
                  <strong className='text-sm md:text-md lg:text-lg'>{comment.name}</strong>
                  <p className='text-xs md:text-sm lg:text-md'>{comment.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      {/* <p className='text-gray-900'>{user.name}</p> */}
      </div>


    </div>
  )
}

export default PostDetail