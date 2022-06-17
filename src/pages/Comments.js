import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import comments from "../data/comments";
import posts from "../data/posts";
import "../styles/comments.css";

function Comments() {
  const [like, setLike] = useState(0);
  const [likePopup, setLikePopUp] = useState(false);
  const [postData, setPostData] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [Author, setAuthor] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentLength, setCommentLength] = useState(0);
  const pathname = window.location.pathname;
  let code = pathname?.split("/")[2];

  // this function return the all comments  of a post
  const getPostComments = (code) => {
    let data;
    try {
      data = JSON.parse(comments)[code];
    } catch (error) {
      data = comments[code];
    }
    if (!data) {
      return [];
    }
    return data;
  };

  // this function manage the likes when we press like button  it increse by 1
  const likeHandler = () => {
    setLikePopUp(true);
    setLike(like + 1);

    setTimeout(function () {
      setLikePopUp(false);
    }, 1000);
  };

  //this function add a new comment with author name and increse the comment count
  const handleComment = (e) => {
    e.preventDefault();
    if (!Author || !newComment) {
      return alert("Please fill the required fields");
    }
    setPostComments([
      ...postComments,
      {
        user: Author,
        text: newComment,
      },
    ]);
    setCommentLength(commentLength + 1);
    setAuthor("");
    setNewComment("");
  };
  useEffect(() => {
    if (code) {
      setPostData(posts.find((post) => post.code === code));
      setPostComments(getPostComments(code));
      setCommentLength(comments[code] ? comments[code].length : 0);
    }
    setLike(postData.likes);
  }, [code, postData]);

  return (
    <div className="container mb-5">
      <Header />
      <div
        className="card  justify-content-between m-auto"
        style={{ minHeight: "600px", width: "90%" }}
      >
        <div className="row " style={{ padding: "20px" }}>
          <div className="col-md-8 postDetail">
            <div className="" style={{ position: "relative", width: "100%" }}>
              <img
                src={postData.display_src}
                width={"100%"}
                style={{ objectFit: "cover" }}
                alt=""
              />
              {likePopup ? (
                <div className="likeOverlay">
                  <div className="likeIcon">
                    <span className="likeCount">{like}</span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="postDescription">
              <p>{postData.caption}</p>
            </div>
            <div className="btnDiv mt-2 ">
              <button onClick={likeHandler} className="btn mr-2">
                💙 {like}
              </button>
              <button className="btn">💬 {commentLength}</button>
            </div>
          </div>
          <div className="col-md-4">
            {postComments.map((comment, index) => (
              <div className="commentBox" key={index}>
                <span className="author">{comment.user}</span>
                <span className="commentText">{comment.text}</span>
              </div>
            ))}
            <form className="commentForm" onSubmit={handleComment}>
              <input
                type="text"
                required
                placeholder="Author"
                onChange={(e) => setAuthor(e.target.value)}
                value={Author}
                className="commentInput"
              />
              <input
                required
                placeholder="Comment"
                type="text"
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
                className="commentInput"
              />
              <button type="submit" className="btn w-25 mt-4 ">
                send ➢
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
