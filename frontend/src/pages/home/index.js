import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/sendVerification";
import "./style.css";
import Post from "../../components/post";

export default function Home({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((user) => ({ ...user }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [posts]);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {!user.verified && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}
