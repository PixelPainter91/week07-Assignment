import React, { useState } from "react";
import "./homepage.css";
import Navbar from "../../components/Navbar/Navbar";

export default function HomePage() {
  // Mock posts data --need to add setPosts
  const [posts] = useState([
    { id: 1, user: "Alice", content: "Just climbed a mountain!" },
    { id: 2, user: "Bob", content: "Kayaking adventures today " },
    { id: 3, user: "Charlie", content: "Sunset hike was amazing" },
  ]);

  const [search, setSearch] = useState("");

  // Filter posts by search
  const filteredPosts = posts.filter(
    (post) =>
      post.user.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div>
    <Navbar />
    </div>
    <div className="homepage">
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="feed">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="post">
              <h4>{post.user}</h4>
              <p>{post.content}</p>
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
