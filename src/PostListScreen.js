import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const PostListScreen = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/posts?page=${page}`);
      setPosts([...posts, ...response.data]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setHasMore(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>No more posts to load</h4>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.author}</p>
              <p className="mt-2">{post.content}</p>
   
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PostListScreen;
