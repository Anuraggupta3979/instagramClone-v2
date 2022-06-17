import React, { useState } from "react";
import comments from "../data/comments";

function Post({ data }) {
  const [like, setLike] = useState(data.likes);
  const [likePopup, setLikePopUp] = useState(false);

  // this function return the count of comments 
  const getCommentsLength = (code) => {
    let commentsLength = comments[code] ? comments[code].length : 0;
    return commentsLength;
  };

  // this function manage the likes when we press like button  it increse by 1
  const likeHandler = () => {
    setLikePopUp(true);
    setLike(like + 1);
    setTimeout(function () {
      setLikePopUp(false);
    }, 1000);
  };

  return (
    <div className="col-md-6 col-lg-4 d-flex justify-content-center  mb-4">
      <div className="card">
        <a href={`/comments/${data.code}`}>
          <div className="position-relative">
            <img
              src={data.display_src}
              className="card-img-top position-relative"
              alt="..."
            />
            {/*  it shows only for 1 second when we pree the like button  */}
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
        </a>
        <div className="card-body">
          <p className="card-text">
            {data.caption.length <= 110
              ? data.caption
              : `${data.caption.slice(0, 110)} ...`}
          </p>
          <div className="btnDiv mt-2 ">
            <button onClick={likeHandler} className="btn mr-2">
              💙 {like}
            </button>
            <a
              href={`/comments/${data.code}`}
              style={{ textDecoration: "none" }}
              className="btn"
            >
              💬 {getCommentsLength(data.code)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
