import React from "react";
import Header from "../components/Header";
import Post from "../components/Post"; 
import posts from "../data/posts"; // post data
import "../styles/posts.css";
function Posts() {
  return (
    <div className="container App">
      <Header />
      <div className=" mx-auto mt-4 justify-content-center ">
        <div className="row ">
          {/* map all posts */}
          {posts.map((data, index) => (
            <Post data={data} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
