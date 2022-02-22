import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const PF = "http://localhost:5000/images/";
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const { user } = useContext(Context);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const result = await axios.get('/posts/' + path,);
      setPost(result.data)

    };
    getPost()
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { userName: user._doc.userName }
      })
      window.location.replace('/')

    } catch (error) {

      console.log(error)

    }

  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        userName: user._doc.userName,
        title,
        desc,
      });
      setUpdateMode(false);
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="enter title..."
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.userName === user?._doc.userName && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.userName}`} className="link">
              <b> {post.userName}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <div>{post?.desc}</div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="enter description..."
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
