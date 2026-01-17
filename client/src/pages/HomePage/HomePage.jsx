import React, { useState } from "react";
import "./homepage.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";


export default function HomePage() {
  
  //mockposts to represent what it could look like once the mypage posts/ mypage pages are linked to the homepage/feed 
  //TODO: add more pages to MyPage.
  const [posts] = useState([
    {
      id: 1,
      user: "Alice",
      content: "Just climbed a mountain!",
      Pic: "#",
      mypageLink: "#",
    },
    {
      id: 2,
      user: "Current user Mockpost",
      content: "Me in Coba Maya",
      Pic: "/aboutimages/mecobamaya.jpg",
      mypageLink: "/mypage",
    },
    {
      id: 3,
      user: "Charlie",
      content: "Sunset hike was amazing!",
      Pic: "#",
      mypageLink: "#",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.user.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="homepage">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="feed">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="post">
                <div className="post-header">
                  {post.Pic && (
                    <img
                      src={post.Pic}
                      alt={`${post.user} profile`}
                      className="post-pic"
                    />
                  )}
                  <h4>{post.user}</h4>
                </div>
                <p>{post.content}</p>
                {post.mypageLink && (
                  <Link to={post.mypageLink} className="mypage-link">
  View MyPage
</Link>

                )}
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </div>
    </>
  );
}
