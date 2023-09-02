import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { baseURL } from '../BaseURL'
import Header from '../components/Header'
import BlogDetails from '../components/BlogDetails'


const BlogPage = () => {

  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";

  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRealatedBlogs] = useState([])

  const location = useLocation();
  const navigation = useNavigate();
  const { setLoading, loading } = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs() {

    setLoading(true)

    let url = `${newBaseUrl}get-blog?blogId=${blogId}`
    try {
      const result = await fetch(url)
      const data = await result.json();

      setBlog(data.blog)
      setRealatedBlogs(data.relatedBlogs)

    } catch (error) {
      console.log("realtted blogs mai errror");
      setBlog(null)
      setRealatedBlogs([])
    }
    setLoading(false)
  }
  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }

  }, [location.pathname])

  return (
    <div >
      <Header />

      {
        loading ? <p>loading</p> : (blog ?
          <div className='max-w-[720px] px-[25px] mx-auto'>

          <div className='mt-24'>
      <button className='border-2 rounded-md border-[#dfdfdf] py-1 px-4 hover:bg-[#efefef] transition-all'
            onClick={() => navigation(-1)}>
            Back
          </button>
      </div>


            <BlogDetails post={blog} />
            <h2>Related Blogs</h2>
            {
              relatedBlogs.map((post) => {
                return <div key={post.id}>
                  <BlogDetails post={post} />
                </div>


              })
            }
            
          </div> :

          <p>no blog found</p>)
      }
    </div>
  )
}

export default BlogPage 