import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { postDeleted } from './postsSlice'

export const PostsList = () => {
  // NOTES: Used to get the data from the state ~ useSelector
  const posts = useSelector((state) => state.posts)

  const dispatch = useDispatch()

  const deletePost = (id) => {
     dispatch(postDeleted({id}))
  }

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
      <br/>
      <TimeAgo timestamp={post.date} />
      <br/>
      <ReactionButtons post={post} />
      <br/>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <button onClick={() => deletePost(post.id)} className="button">Delete</button>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
