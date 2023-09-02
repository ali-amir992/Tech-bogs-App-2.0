import React, { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import Home from './pages/Home'
import TagPage from './pages/TagPage'
import CategoryPage from "./pages/CategoryPage"
import BlogPage from './pages/BlogPage'


const App = () => {

  const { fetchBlogData } = useContext(AppContext);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;

    if (location.pathname.includes("tags")) {
      //iska matlab tag wala page show krna h 
      const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogData(Number(page), tag);
    }
    else if (location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogData(Number(page), null, category);
    }
    else {
      fetchBlogData(Number(page));
    }
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:blogId" element={<BlogPage />} />
      <Route path="/tags/:tag" element={<TagPage />} />
      <Route path="/categories/:category" element={<CategoryPage />} />
    </Routes>
  );
}
export default App