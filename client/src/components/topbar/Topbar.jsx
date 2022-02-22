import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Noperson from "../../assets/img/person.jpg";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const [currentUser, setCurrentUser] = useState()
  const PF = "http://localhost:5000/images/"

  const logout = () => {

    dispatch({ type: "LOGOUT" })

  };

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('/users/' + user?._doc?._id)
      setCurrentUser(res.data)
    }

    getUser()


  }, [user?._doc?._id]);

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <Link className="link" to="/settings">
            <li className="topListItem">ABOUT</li>
          </Link>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li onClick={logout} className="topListItem">LOGOUT</li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={currentUser?.profilepicture ? PF + currentUser?.profilepicture : Noperson}
              alt="user"
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
