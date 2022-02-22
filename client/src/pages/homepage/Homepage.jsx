import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from 'axios';
import "./homepage.css";

export default function Homepage() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const{search}=location

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await  axios.get('/posts'+search);
      setPosts(result.data)

    };
    fetchPosts()
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
