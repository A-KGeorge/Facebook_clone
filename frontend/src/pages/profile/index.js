import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useRef, useState } from "react";
import { profileReducer } from "../../functions/reducers";
import axios from "axios";
import Header from "../../components/header";
import "./style.css";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPosts from "./GridPosts";
import Post from "../../components/post";
import Photos from "./Photos";
import Friends from "./Friends";
import { Link } from "react-router-dom";
import Intro from "../../components/intro";
import { useMediaQuery } from "react-responsive";
import CreatePostPopup from "../../components/createPostPopup";

export default function Profile({ getAllPosts }) {
  const [visible, setVisible] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const userName = username === undefined ? user.username : username;
  const [photos, setPhotos] = useState({});
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: [],
    error: "",
  });

  useEffect(() => {
    getProfile();
  }, [userName]);

  useEffect(() => {
    setOtherName(profile?.details?.otherName);
  }, [profile]);

  const [othername, setOtherName] = useState();
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  useEffect(() => {
    if (profile.posts && profile.posts.length > 0) {
      window.scrollTo(0, 0);
    }
  }, [profile.posts]);

  var visitor = userName !== user.username;

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            {
              path,
              sort,
              max,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
    return () => {
      window.addEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);

  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  const getScroll = () => {
    setScrollHeight(window.scrollY);
  };

  return (
    <div className="profile">
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={profile?.posts}
          dispatch={dispatch}
          profile
        />
      )}
      <Header page="profile" getAllPosts={getAllPosts} />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          <Cover
            cover={profile.cover}
            visitor={visitor}
            photos={photos.resources}
          />
          <ProfilePictureInfos
            profile={profile}
            visitor={visitor}
            photos={photos.resources}
            othername={othername}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? "scrollFixed showLess"
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    "scrollFixed showMore"
              }`}
            >
              <div className="profile_left" ref={leftSide}>
                <Intro
                  detailss={profile.details}
                  visitor={visitor}
                  setOtherName={setOtherName}
                />
                <Photos
                  username={userName}
                  token={user.token}
                  photos={photos}
                />
                <Friends friends={profile.friends} />
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>
                  </Link>
                  <span>. </span>
                  <Link to="/">Cookies </Link>
                  <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2023
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} setVisible={setVisible} profile />
                )}
                <GridPosts />
                <div
                  className={`posts ${
                    profile.posts && profile.posts.length ? "" : "custom_height"
                  }`}
                >
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} profile />
                    ))
                  ) : (
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
