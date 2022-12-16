import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));

    // fetch('https://dummyjson.com/products?limit=100')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setPosts(data.products);
    //   });
  }, []);
  return (
    <div>
      <h1>BLOGS</h1>
      {posts.map((post: { id: number; title: string }) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <li>{post.title}</li>
        </Link>
      ))}
    </div>
  );
}

export { BlogPage };
